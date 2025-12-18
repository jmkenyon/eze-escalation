export type IncidentUpdateEvent = {
    update: string | null;
    advice: string | null;
    status: "OPEN" | "RESOLVED";
    createdAt: string; 
  };