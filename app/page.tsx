export default function Home() {
  const date = new Date();
  const time = date.toLocaleTimeString();
  return (
    <main className="bg-blue-400 flex flex-col justify-center items-center text-blue-950 h-screen">
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[50%]">
        <div className="flex flex-row">
          <p>
            <span className="font-bold">{time} - </span>
            <span>Network team are analysing disconnect in NY4</span>
          </p>
        </div>
      </div>
    </main>
  );
}
