"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import IncidentSheet from "./IncidentSheet";
import { Incident } from "@prisma/client";
import UpdatesSheet from "./UpdatesSheet";
import { Updates } from "../types/updates";
import { cn } from "@/lib/utils";


interface ClosedWrapperProps {
  children: React.ReactNode;
  closedIncidents: Incident[];
  updates?: Updates;
  rightDrawer?: boolean
}

const ClosedWrapper = ({
  children,
  closedIncidents,
  updates,
  rightDrawer,
}: ClosedWrapperProps) => {
  const [open, setOpen] = useState(false);
  const [openUpdates, setOpenUpdates] = useState(false);

  return (
    <main
      className={cn("bg-blue-400 ",
        (updates || rightDrawer) && "flex flex-row justify-between"
      )}
    >
      <IncidentSheet
        open={open}
        onOpenChange={setOpen}
        closedIncidents={closedIncidents}
      />
      <Button
        className="bg-white inline-flex px-3 py-1 mt-10 cursor-pointer text-black rounded-l-none"
        variant={"outline"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>Closed Incidents</p>
      </Button>

      {children}
      {updates && (
        <div>
          <UpdatesSheet
            open={openUpdates}
            onOpenChange={setOpenUpdates}
            updates={updates}
          />
          <Button
            className="bg-white inline-flex px-3 py-1 mt-10 cursor-pointer text-black rounded-r-none"
            variant={"outline"}
            onClick={() => setOpenUpdates((prev) => !prev)}
          >
            <p>Previous Updates</p>
          </Button>
        </div>
      )}
    </main>
  );
};

export default ClosedWrapper;
