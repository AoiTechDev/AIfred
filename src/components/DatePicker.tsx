"use client";

import { Calendar } from "@/components/ui/calendar";
import { useCalendarStore } from "@/store/store";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { cn, formattedDate } from "@/lib/utils";
import AddEventContent from "./AddEventContent";

export function DatePicker() {
  const { setCurrentDate, date } = useCalendarStore();
  return (
    <div className="w-full flex justify-between gap-6 p-6">
      <Popover>
        <PopoverTrigger asChild className="">
          <Button
            variant={"outline"}
            className={cn("w-[240px] pl-3 text-left font-normal")}
          >
            <span>
              {" "}
              {typeof date === "undefined"
                ? "Select Date"
                : formattedDate(date)}
            </span>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date: Date | undefined) => setCurrentDate(date)}
            className="rounded-md "
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild className="">
          <Button>Add Event</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-6" align="center">
          <AddEventContent/>
        </PopoverContent>
      </Popover>
    </div>
  );
}
