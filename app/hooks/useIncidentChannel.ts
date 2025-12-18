import { pusherClient } from "@/lib/pusher";
import { useEffect } from "react";
import { IncidentUpdateEvent } from "../types/incident";

export const useIncidentChannel = (incidentId: string, onUpdate: (data: IncidentUpdateEvent) => void) => {
    useEffect(() => {
      if (!incidentId) return;
  
      const channel = pusherClient.subscribe(`incident-${incidentId}`);
  
      channel.bind("incident:update", (data: IncidentUpdateEvent) => {
        onUpdate(data);
      });
  
      return () => {
        channel.unbind_all();
        pusherClient.unsubscribe(`incident-${incidentId}`);
      };
    }, [incidentId, onUpdate]);
  };