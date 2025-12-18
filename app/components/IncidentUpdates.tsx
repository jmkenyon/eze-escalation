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
          },
          ...prev,
        ]);
      }

      if (data.advice !== null && data.advice !== undefined) {
        setLiveAdvice(data.advice);
      }
    });

    return () => {
      console.log("[PUSHER] Unsubscribing");
      channel.unbind_all();
      pusherClient.unsubscribe(`incident-${incidentId}`);
    };
  }, [incidentId]);
  return (
    <main className="bg-blue-400 flex flex-col pt-10 items-center text-blue-950 h-full">
      <div className="bg-white p-10 rounded-lg shadow min-w-3xl  mb-5 flex flex-col gap-3">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Latest advice
        </p>
        {liveAdvice !== undefined ? (
          <p>{liveAdvice}</p>
        ) : (
          <p className="text-gray-400 italic">No advice given</p>
        )}
      </div>

      <div className="bg-white p-10 rounded-lg shadow min-w-3xl min-h-[50%]">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Updates</h2>
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
              <li className="text-gray-400 italic">No updates</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IncidentUpdates;
