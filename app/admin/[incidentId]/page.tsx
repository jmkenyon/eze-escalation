import ClosedWrapper from "@/app/components/ClosedWrapper";
import prisma from "@/app/lib/prisma";
import Link from "next/link";

interface IParams {
  incidentId?: string;
}

const IncidentPage = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params;

  const incident = await prisma.incident.findUnique({
    where: {
      id: resolvedParams.incidentId,
    },
  });

  const closedIncidents = await prisma.incident.findMany({
    where: {
      status: "RESOLVED",
    },
  });

  const updates = await prisma.message.findMany({
    where: {
      incidentId: resolvedParams.incidentId,
      update: { not: "" },
    },
    orderBy: { createdAt: "desc" },
    select: { update: true },
  });

  const advice = await prisma.message.findMany({
    where: {
      incidentId: resolvedParams.incidentId,
      advice: { not: "" },
    },
    orderBy: { createdAt: "desc" },
    select: { advice: true },
  });

  if (!incident) {
    return (
      <ClosedWrapper closedIncidents={closedIncidents}>
        <div className="bg-blue-400 h-screen flex flex-col items-center justify-center ">
          <h1 className="text-white font-bold text-3xl">No incident found</h1>
        </div>
      </ClosedWrapper>
    );
  }

  return (
    <ClosedWrapper closedIncidents={closedIncidents}>
      <div className="bg-white max-w-30 text-center mt-10 rounded-l-none rounded-xl py-3 cursor-pointer hover:bg-white/90">
        <Link href="/admin">Dashboard</Link>
      </div>
      <div className="bg-blue-400 h-full p-20 flex flex-col items-center">
        <div className="bg-white min-w-3xl p-10 rounded-xl shadow-2xl space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {incident.title}
            </h1>
            {incident.resolvedAt && (
              <p className="text-sm text-gray-500 mt-1">
                Resolved on {new Date(incident.resolvedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Updates
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {updates.length > 0 ? (
                updates.map((item, index) => <li key={index}>{item.update}</li>)
              ) : (
                <li className="text-gray-400 italic">No updates</li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Advice Given
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {advice.length > 0 ? (
                advice.map((item, index) => <li key={index}>{item.advice}</li>)
              ) : (
                <li className="text-gray-400 italic">No advice recorded</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </ClosedWrapper>
  );
};

export default IncidentPage;
