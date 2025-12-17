import { cookies } from "next/headers";
import prisma from "@/app/lib/prisma"

export async function POST(req: Request) {
  const { advice, update, incidentId, status } = await req.json();

  const cookieStore = await cookies();
  const senderId = cookieStore.get("admin_session")?.value;

  if (!senderId) {
    return new Response("Unauthorized", { status: 401 });
  }

  await prisma.message.create({
    data: {
      advice,
      update,
      sender: {
        connect: { id: senderId },
      },
      incident: {
        connect: { id: incidentId },
      },
    },
  });

  if (status === "RESOLVED") {
    await prisma.incident.update({
      where: {
        id: incidentId
      },
      data: {
        status,
        resolvedAt: new Date()
      }
    })
  }



  return new Response("OK");
}
