"use client";
import { formattedDate } from "@/lib/utils";
import { useCalendarStore } from "@/store/store";
import { FormLabel, Input } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useRef, useState } from "react";
import SaveButton from "./SaveButton";
import { addEvent } from "@/app/actions/action";
import { importantArr } from "@/constants/constants";

const AddEventContent = () => {
  const { date } = useCalendarStore();
  const [newFromValue, setNewFromValue] = useState<dayjs.Dayjs | null>(null);
  const [newToValue, setNewToValue] = useState<dayjs.Dayjs | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);
  const prioritiesRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [priority, setPriority] = useState<string | null>(null);

  const handleSelectPriority = (value: string, index: number) => {
    for (let i = 0; i < prioritiesRefs.current.length; i++) {
      prioritiesRefs.current[i]!.style.backgroundColor = "white";
    }

    prioritiesRefs.current[index]!.style.backgroundColor =
      importantArr[index].color;

    setPriority(value);
  };
  const actionHanlder = addEvent.bind(null, date, priority);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form action={actionHanlder} className="space-y-6 overflow-y-auto">
        <div>
          <FormLabel>Event name: </FormLabel>
          <Input
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <p>{formattedDate(date)}</p>
        <div className="flex justify-between">
          <p>From:</p>
          <TimePicker
            label="Basic time picker"
            value={newFromValue ? newFromValue : dayjs(new Date())}
            onChange={(newValue) => setNewFromValue(dayjs(newValue))}
            ampm={false}
            name="fromTime"
          />
        </div>
        <div className="flex justify-between">
          <p>To:</p>
          <TimePicker
            label="Basic time picker"
            value={newToValue ? newToValue : dayjs(new Date())}
            onChange={(newValue) => setNewToValue(dayjs(newValue))}
            ampm={false}
            name="toTime"
          />
        </div>

        <p className="font-semibold">How important is this?</p>
        <div className="flex flex-col gap-2">
          {importantArr.map((item, index) => (
            <div
              style={{
                border: `solid ${item.color} 2px`,
              }}
              className="p-2 rounded-lg border-2  cursor-pointer"
              key={index}
              ref={(el) => {
                prioritiesRefs.current[index] = el;
              }}
              onClick={() => handleSelectPriority(item.label, index)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div>Add Location</div>

        <SaveButton />
      </form>
    </LocalizationProvider>
  );
};

export default AddEventContent;
