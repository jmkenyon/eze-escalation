import Form from "../components/Form";
import prisma from "@/app/lib/prisma"


const Page = async () => {

  const adviceResult = await prisma.message.findFirst({
    orderBy: {createdAt: "desc"},
    select: {advice: true}
  })

  const adviceContent =
  adviceResult?.advice ?? undefined;
 
  return (
    <main className="bg-blue-400 h-screen flex flex-col items-center md:p-30 p-10">
      <Form adviceContent={adviceContent}/>
    </main>
  );
};

export default Page;
