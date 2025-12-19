"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import IncidentSheet from "./IncidentSheet";
import { Incident } from "@prisma/client";
import UpdatesSheet from "./UpdatesSheet";
import { Updates } from "../types/updates";

interface ClosedWrapperProps {
  children: React.ReactNode;
  closedIncidents: Incident[];
  updates?: Updates;
  rightDrawer?: boolean;
  incidentId?: string;
}

const ClosedWrapper = ({
  children,
  closedIncidents,
  updates,
  incidentId,
}: ClosedWrapperProps) => {
  const [open, setOpen] = useState(false);
  const [openUpdates, setOpenUpdates] = useState(false);

  return (
    <main className="relative bg-blue-400 min-h-screen flex justify-center">
      <IncidentSheet
        open={open}
        onOpenChange={setOpen}
        closedIncidents={closedIncidents}
      />
      <Button
        className="absolute left-0 top-10 bg-white px-3 py-1 rounded-l-none"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
      >
        Closed Incidents
      </Button>

      <div className="w-full max-w-4xl">{children}</div>
      {updates && (
        <div>
          <UpdatesSheet
            open={openUpdates}
            onOpenChange={setOpenUpdates}
            updates={updates}
            incidentId={incidentId}
          />
          <Button
            className="absolute right-0 top-10 bg-white px-3 py-1 rounded-r-none"
            variant="outline"
            onClick={() => setOpenUpdates((prev) => !prev)}
          >
            Previous Updates
          </Button>
        </div>
      )}
    </main>
  );
};

export default ClosedWrapper;
