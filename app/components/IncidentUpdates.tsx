"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { IncidentUpdateEvent } from "../types/incident";

interface IncidentUpdatesProps {
  incidentId: string;
  adviceContent?: string;
  updates: {
    update: string | null;
    createdAt: Date;
    id: string

  }[];
}

const IncidentUpdates = ({
  incidentId,
  adviceContent,
  updates,
}: IncidentUpdatesProps) => {
  const [liveUpdates, setLiveUpdates] = useState(updates);

  const [liveAdvice, setLiveAdvice] = useState<string | undefined>(
    adviceContent
  );

  useEffect(() => {
    if (!incidentId) return;

    console.log("[PUSHER] Subscribing to:", `incident-${incidentId}`);

    const channel = pusherClient.subscribe(`incident-${incidentId}`);

    channel.bind("incident:update", (data: IncidentUpdateEvent) => {
      console.log("[PUSHER] Event received:", data);

 
      if (data.update) {
        setLiveUpdates((prev) => [
          {
            update: data.update,
            createdAt: new Date(data.createdAt),
            id: data.messageId
          },
          ...prev,
        ]);
      }

      if (data.advice) {
        setLiveAdvice(data.advice);
      }
    });


    channel.bind("incident:message_delete", (data: IncidentUpdateEvent) => {
      console.log("[PUSHER] Delete Event received:", data);

      if (data.update) {
        setLiveUpdates((prev) => prev.filter(update => update.id !== data.messageId));
      }
    });



    return () => {
      console.log("[PUSHER] Unsubscribing");
      channel.unbind_all();
      pusherClient.unsubscribe(`incident-${incidentId}`);
    };
  }, [incidentId]);
  return (
    <main className="bg-blue-400 flex flex-col pt-10 items-center text-blue-950 h-full md:p-10 p-5">
      <div className="bg-white md:p-10 p-5 rounded-lg shadow w-full mb-5 flex flex-col gap-3 max-w-4xl">
        <p className="md:text-lg sm:text-base text-sm font-semibold text-gray-800 mb-2">
          Latest advice
        </p>
        {liveAdvice !== undefined ? (
          <p>{liveAdvice}</p>
        ) : (
          <p className="text-gray-400 italic md:text-base sm:text-sm text-xs ">No advice given</p>
        )}
      </div>

      <div className="bg-white md:p-10 p-5 rounded-lg shadow min-h-[50%] w-full max-w-4xl">
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 mb-2 md:text-lg sm:text-base text-sm ">Updates</h2>
          <ul className="space-y-2 list-none text-gray-700">
            {liveUpdates.length > 0 ? (
              liveUpdates.map((item, index) => (
                <li key={index}>
                  <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                    {new Date(item.createdAt).toISOString().slice(11, 19)}
                  </span>
                  <span className="text-gray-800"> {item.update}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic md:text-base sm:text-sm text-xs ">No updates</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IncidentUpdates;
