"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import IncidentSheet from "./IncidentSheet";
import { Incident } from "@prisma/client";

interface ClosedWrapperProps {
  children: React.ReactNode;
  closedIncidents: Incident[]
}

const ClosedWrapper = ({ children, closedIncidents }: ClosedWrapperProps) => {
  const [open, setOpen] = useState(false);

  return (
    <main className="bg-blue-400">
      <IncidentSheet open={open} onOpenChange={setOpen} closedIncidents={closedIncidents} />
      <Button
        className="bg-white inline-flex px-3 py-1 mt-10 cursor-pointer text-black rounded-l-none"
        variant={"outline"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>Closed Incidents</p>
      </Button>
      {children}
    </main>
  );
};

export default ClosedWrapper;
