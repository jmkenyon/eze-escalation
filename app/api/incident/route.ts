import prisma from "@/app/lib/prisma"
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { title } = await req.json();

    const cookieStore = await cookies();
    const senderId = cookieStore.get("admin_session")?.value;
  
    if (!senderId) {
      return new Response("Unauthorized", { status: 401 });
    }

  const openIncident = await prisma.incident.findFirst({
    where: { status: "OPEN" },
  });

  if (openIncident) {
    return new Response("Incident already open", { status: 409 });  }


  await prisma.incident.create({
    data: {
        title
    },
  });
  return new Response("OK");
}
