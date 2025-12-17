import prisma from "@/app/lib/prisma";

export default async function Home() {
  const adviceResult = await prisma.message.findFirst({
    orderBy: { createdAt: "desc" },
    select: { advice: true },
  });

  const adviceContent = adviceResult?.advice ?? undefined;

  const updates = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      update: true,
      createdAt: true,
    },
  });

  return (
    <main className="bg-blue-400 flex flex-col pt-10 items-center text-blue-950 h-screen">
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[20%] mb-5 flex flex-col gap-3">
        <p className="font-bold">Latest advice</p>
        <p>{adviceContent}</p>
      </div>
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[50%]">
        <div className="flex flex-col">
          {updates.map((item, index) => (
            <div key={index} className="flex flex-row items-center">
              <p>
              <span className="text-sm font-bold">
                {item.createdAt.toLocaleTimeString()} - {" "}
              </span>
              <span>{item.update}</span>
            </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
