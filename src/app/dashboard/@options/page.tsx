"use client";
import { useCurrentEventStore } from "@/store/store";
import { TimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { deleteEvent, updateEvent } from "@/app/actions/action";

import SaveButton from "@/components/SaveButton";
import { importantArr } from "@/constants/constants";
import DeleteButton from "@/components/DeleteButton";
import { toast } from "react-toastify";

const Options = () => {
  const prioritiesRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { event, setCurrentEvent } = useCurrentEventStore();

  const [newFromValue, setNewFromValue] = useState(dayjs(event.start));
  const [newToValue, setNewToValue] = useState(dayjs(event.end));
  const [eventName, setEventName] = useState(event.name);

  useEffect(() => {
    setNewFromValue(dayjs(event.start));
    setNewToValue(dayjs(event.end));
    setEventName(event.name);
    for (let i = 0; i < prioritiesRefs.current.length; i++) {
      prioritiesRefs.current[i]!.style.backgroundColor = "white";
      prioritiesRefs.current[i]!.style.borderColor = importantArr[i].color;
    }
    if (event.description) {
      try {
        const prio = JSON.parse(event.description);
        for (let i = 0; i < prioritiesRefs.current.length; i++) {
          if (prioritiesRefs.current[i]?.innerText === prio?.priority) {
            prioritiesRefs.current[i]!.style.backgroundColor =
              importantArr[i].color;
          }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error gracefully
      }
    }
  }, [event]);
  const [priority, setPriority] = useState<string | null>(null);
  const handleSubmitForm = () => {
    updateEvent.bind(null, event, priority);
    toast.success("Updated successfully!");
  };
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    event.name = "";
    toast.success("Deleted successfully!");
  };

  const handleSelectPriority = (value: string, index: number) => {
    for (let i = 0; i < prioritiesRefs.current.length; i++) {
      prioritiesRefs.current[i]!.style.backgroundColor = "white";
    }

    prioritiesRefs.current[index]!.style.backgroundColor =
      importantArr[index].color;

    setPriority(value);
  };
  if (!event) return <div>No Event Selected</div>;

  const tasksArray = [
    { address: "Zawiła 54, Kraków" },
    { address: "Grunwaldzka 23, Warszawa" },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="order-2 lg:order-3 w-full lg:max-w-[350px] border-2 rounded-lg border-gray-200 overflow-y-auto">
        <form action={handleSubmitForm} className=" p-4 space-y-4 ">
          {event.name !== "" ? (
            <div className="space-y-4">
              {" "}
              <input
                name="eventName"
                className="font-bold w-full text-2xl"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <TimePicker
                    label="From"
                    value={newFromValue}
                    onChange={(newValue) => setNewFromValue(dayjs(newValue))}
                    ampm={false}
                    name="fromTime"
                  />
                </div>
                <div className="flex justify-between">
                  <TimePicker
                    label="To"
                    value={newToValue}
                    onChange={(newValue) => setNewToValue(dayjs(newValue))}
                    ampm={false}
                    name="toTime"
                  />
                </div>
              </div>
              <p className="font-semibold">How important is this?</p>
              <div className="flex flex-col gap-2">
                {importantArr?.map((item, index) => (
                  <div
                    className={` p-2 rounded-lg border-2  cursor-pointer`}
                    key={index}
                    onClick={() => handleSelectPriority(item.label, index)}
                    ref={(el) => {
                      prioritiesRefs.current[index] = el;
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <SaveButton />
                <DeleteButton
                  onClick={() => handleDeleteEvent(event.eventId)}
                />
              </div>
            </div>
          ) : null}
        </form>
        {/* <form action={searchPlace}>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Button>Find</Button>
        </form> */}
      </div>
    </LocalizationProvider>
  );
};

export default Options;
