export const dynamic = "force-dynamic";

import Form from "../components/Form";
import prisma from "@/app/lib/prisma";

import IncidentForm from "../components/IncidentForm";

import ClosedWrapper from "../components/ClosedWrapper";

const Page = async () => {
  const closedIncidents = await prisma.incident.findMany({
    where: {
        status: "RESOLVED"
    },
    orderBy: { openedAt: "desc" },
})
  const incident = await prisma.incident.findFirst({
    where: { status: "OPEN" },
    orderBy: { openedAt: "desc" },
    select: { id: true, title: true },
  });

  if (!incident) {
    return (
      <ClosedWrapper closedIncidents={closedIncidents}>
        <section className=" h-screen flex flex-col items-center mt-20">
          <IncidentForm />
        </section>
      </ClosedWrapper>
    );
  }

  const updates = await prisma.message.findMany({
    where: { 
      incidentId: incident.id,
      update: { not: "" },
    },
    orderBy: { createdAt: "desc" },
    select: {
      update: true,
      createdAt: true,
      id: true
    },
  });


  const adviceResult = await prisma.message.findFirst({
    where: { incidentId: incident.id },
    orderBy: { createdAt: "desc" },
    select: { advice: true },
  });

  const adviceContent = adviceResult?.advice ?? undefined;

  return (
    <ClosedWrapper closedIncidents={closedIncidents} updates={updates}>
      <section className="bg-blue-400 h-full flex flex-col items-center p-10">
        <Form adviceContent={adviceContent} incident={incident} />
      </section>
    </ClosedWrapper>
  );
};

export default Page;
