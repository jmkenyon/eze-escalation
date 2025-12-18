import prisma from "@/app/lib/prisma";

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
    where: { incidentId: incident.id },
    orderBy: { createdAt: "desc" },
    select: {
      update: true,
      createdAt: true,
    },
  });



  return (
    <main className="bg-blue-400 flex flex-col pt-10 items-center text-blue-950 h-screen">
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[20%] mb-5 flex flex-col gap-3">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Latest advice
        </p>
        {adviceContent ? (
          <p>{adviceContent}</p>
        ) : (
          <p className="text-gray-400 italic">No advice given</p>
        )}
      </div>
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[50%]">
        <div className="flex flex-col">
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
      </div>
    </main>
  );
}
