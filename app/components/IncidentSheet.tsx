"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Incident } from "@prisma/client";
import Link from "next/link";


interface IncidentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closedIncidents: Incident[];
}

const IncidentSheet = ({
  open,
  onOpenChange,
  closedIncidents,
}: IncidentSheetProps) => {

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className=" border-b">
          <div className="flex items-center">
            <SheetTitle>Closed Incidents</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full">
          <div>
            {closedIncidents.map((item, index) => (
              <Link
               href={`/admin/${item.id}`}
                key={index}
                className="w-full text-left p-4 bg-white text-black hover:bg-blue-400 flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}

              >
                {item.resolvedAt && (
                  <span className="mr-2 text-sm text-gray-800">
                    {new Date(item.resolvedAt).toLocaleDateString()}  
                  </span>
                )}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default IncidentSheet;
