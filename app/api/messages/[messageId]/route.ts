export const runtime = "nodejs";

import { cookies } from "next/headers";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  const { messageId } = await params;

  const cookieStore = await cookies();
  const senderId = cookieStore.get("admin_session")?.value;

  if (!senderId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const existingConversation = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!existingConversation) {
    return new NextResponse("Invalid Incident ID", { status: 400 });
  }

  const findIncidentId = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
    select: {
      incidentId: true,
    },
  });

  const deleteMessage = await prisma.message.delete({
    where: {
      id: messageId,
    },
  });

  await pusherServer.trigger(
    `incident-${findIncidentId?.incidentId}`,
    "incident:message_delete",
    {
      update: deleteMessage.update,
      advice: deleteMessage.advice,
      createdAt: deleteMessage.createdAt.toISOString(),
      messageId: deleteMessage.id,
    }
  );

  return new Response("OK");
}
