export const runtime = "nodejs";

import { cookies } from "next/headers";
import prisma from "@/app/lib/prisma"
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { advice, update, incidentId, status } = await req.json();

  const cookieStore = await cookies();
  const senderId = cookieStore.get("admin_session")?.value;

  if (!senderId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const message = await prisma.message.create({
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

  await pusherServer.trigger(
    `incident-${incidentId}`,
    "incident:update",
    {
      update: message.update,
      advice: message.advice,
      status,
      createdAt: message.createdAt.toISOString(),
      messageId: message.id,
    }
  );



  return new Response("OK");
}
