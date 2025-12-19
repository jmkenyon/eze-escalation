export const dynamic = "force-dynamic";

import prisma from "@/app/lib/prisma";
import IncidentUpdates from "./components/IncidentUpdates";

export default async function Home() {
  const incident = await prisma.incident.findFirst({
    where: { status: "OPEN" },
    orderBy: { openedAt: "desc" },
    select: { id: true },
  });

  if (!incident) {
    return (
      <div className="bg-blue-400 h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl text-white">No open issues</h1>
      </div>
    );
  }

  const adviceResult = await prisma.message.findFirst({
    where: { incidentId: incident.id },
    orderBy: { createdAt: "desc" },
    select: { advice: true },
  });

  const adviceContent = adviceResult?.advice ?? undefined;

  const updates = await prisma.message.findMany({
    where: { 
      incidentId: incident.id,
      update: {not: ""}
    },
    orderBy: { createdAt: "desc" },
    select: {
      update: true,
      createdAt: true,
      id: true
    },
  });

  return (
    <IncidentUpdates
      incidentId={incident.id}
      adviceContent={adviceContent}
      updates={updates}
    />
  );
}
