"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { Updates } from "../types/updates";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { IncidentUpdateEvent } from "../types/incident";




interface UpdatesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updates: Updates;
  incidentId?: string
}

const UpdatesSheet = ({ open, onOpenChange, updates, incidentId}: UpdatesSheetProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentUpdates, setCurrentUpdates] = useState(updates)



    useEffect(() => {
      if (!incidentId) return;
  
      console.log("[PUSHER] Subscribing to:", `incident-${incidentId}`);
  
      const channel = pusherClient.subscribe(`incident-${incidentId}`);
  
      channel.bind("incident:update", (data: IncidentUpdateEvent) => {
        console.log("[PUSHER] Event received:", data);
  
   
        if (data.update) {
          setCurrentUpdates((prev) => [
            {
              update: data.update,
              createdAt: new Date(data.createdAt),
              id: data.messageId
            },
            ...prev,
          ]);
        }

      });
  
  
      channel.bind("incident:message_delete", (data: IncidentUpdateEvent) => {
        console.log("[PUSHER] Delete Event received:", data);
  
        if (data.update) {
          setCurrentUpdates((prev) => prev.filter(update => update.id !== data.messageId));
        }
      });
  
  
  
      return () => {
        console.log("[PUSHER] Unsubscribing");
        channel.unbind_all();
        pusherClient.unsubscribe(`incident-${incidentId}`);
      };
    }, [incidentId]);

  const deleteMessage = async (messageId:string) => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/messages/${messageId}`)
      setCurrentUpdates(prev => prev.filter(update => update.id !== messageId))
      toast.success("Update deleted")
    } catch (error) {
      console.log(error)
      toast.error("Error deleting update")
    } finally { 
      setIsLoading(false)
    }


  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 transition-none">
        <SheetHeader className=" border-b">
          <div className="flex items-center">
            <SheetTitle>Previous Updates</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full">
          <div className="flex flex-col">
            {currentUpdates.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between gap-4 bg-gray-50 px-3 py-2 hover:bg-gray-100 transition"
              >

                <p className="text-sm text-gray-800 flex-1 wrap-break-word">
                  {item.update}
                </p>


                {item.update && (
                  <button
                    className="opacity-0 group-hover:opacity-100 transition text-black hover:text-red-600 p-2 rounded-md hover:bg-red-100 cursor-pointer"
                    aria-label="Delete update"
                    onClick={() => deleteMessage(item.id)}
                    disabled={isLoading}

                  >
                    <Trash className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default UpdatesSheet;
