"use client";
import { importantArr } from "@/constants/constants";
import { formattedDate } from "@/lib/utils";
import {
  useCalendarStore,
  useCurrentDayAllEventsStore,
  useCurrentEventStore,
} from "@/store/store";
import { CurrentDay, CurrentDayEvent } from "@/types/types";
import React, { useEffect, useState } from "react";

const Calendar = ({
  kalendarz,
}: {
  kalendarz: (Response & { items?: CurrentDayEvent[] }) | undefined;
}) => {
  const { date } = useCalendarStore();
  const [currentDayEvents, setCurrentDayEvents] = useState<CurrentDayEvent[]>(
    []
  );

  const { setCurrentDayAllEvents } = useCurrentDayAllEventsStore();

  const [dayEvents, setDayEvents] = useState<CurrentDay>([]);
  const { setCurrentEvent } = useCurrentEventStore();

  useEffect(() => {
    setCurrentDayEvents([]);
    setDayEvents([]);
    setCurrentDayAllEvents([]);
    let tmpArr: CurrentDayEvent[] = [];
    kalendarz?.items?.map((item) => {
      const startDate = new Date(item?.start?.dateTime);

      if (formattedDate(startDate) === formattedDate(date)) {
        let tmpCurrentDay = {
          id: item.id,
          summary: item.summary,
          description: item.description,
          start: {
            dateTime: item.start.dateTime,
          },
          end: {
            dateTime: item.end.dateTime,
          },
        };
        setCurrentDayEvents((prevItems) => [...prevItems, tmpCurrentDay]);
        // console.log(currentDayEvents)
        tmpArr.push(tmpCurrentDay);
      }
    });
    setCurrentDayAllEvents(tmpArr);
    let tmp: CurrentDay = [];

    for (let i = 0; i < 24; i++) {
      const startHour = i;
      const endHour = (i + 1) % 24; // Wrap around to 0 for the last hour

      const startDate = new Date();
      startDate.setHours(startHour, 0, 0, 0);

      const endDate = new Date();
      endDate.setHours(endHour, 0, 0, 0);

      tmp.push({
        start: startDate,
        end: endDate,
      });
    }

    setDayEvents(tmp);
  }, [date, kalendarz?.items]);



  return (
    <div className="max-h-[400px] lg:max-h-full space-y-4 overflow-y-auto lg:h-[90%] ">
      {dayEvents.map((day, index) => (
        <div className=" flex items-center gap-4  pb-4" key={index}>
          <div className="flex  flex-col h-full min-h-10 lg:min-h-16 justify-center">
            <div className="flex items-center justify-center">
              {day.start.getHours()}:00
            </div>{" "}
          </div>

          <div className="min-w-[60px] w-full flex gap-2 relative h-full min-h-10 lg:min-h-16  justify-start items-center  z-0">
            {currentDayEvents.map((currentDayEvent, id) => {
              // const match = currentDayEvent.description
              //   ? importantArr.find(
              //       (prio) =>
              //         prio.label ===
              //         JSON.parse(currentDayEvent.description)?.priority
              //     )
              //   : null;
                let match = null;
                try {
                  match = currentDayEvent.description
                    ? importantArr.find(
                        (prio) =>
                          prio.label ===
                          JSON.parse(currentDayEvent.description)?.priority
                      )
                    : null;
                } catch (error) {
                  // Handle the error gracefully
                  console.error('Error parsing JSON:', error);
                }
              const eventStart = new Date(currentDayEvent?.start?.dateTime);
              const eventEnd = new Date(currentDayEvent?.end?.dateTime);
              return eventEnd.getHours() >= day.start.getHours() &&
                eventStart.getHours() <= day.start.getHours() ? (
                <div
                  key={id}
                  style={{
                    backgroundColor: match ? match.color : "white",
                    border: `solid ${match ? match.color : "#e5e7eb"} 2px`,
                  }}
                  className={`px-2 py-1 rounded-md cursor-pointer z-10 `}
                  onClick={() => {
                    setCurrentEvent({
                      eventId: currentDayEvent?.id,
                      name: currentDayEvent?.summary,
                      description: currentDayEvent?.description,
                      start: currentDayEvent?.start?.dateTime,
                      end: currentDayEvent?.end?.dateTime,
                    });
                  }}
                >
                  {" "}
                  <h2 className="font-semibold text-lg">
                    {currentDayEvent.summary}
                  </h2>
                  <div className="text-sm flex gap-2">
                    <p>
                      {(eventStart.getHours() < 10
                        ? "0" + eventStart.getHours()
                        : eventStart.getHours()) +
                        ":" +
                        (eventStart.getMinutes() < 10
                          ? "0" + eventStart.getMinutes()
                          : eventStart.getMinutes())}
                    </p>{" "}
                    -
                    <p>
                      {" "}
                      {(eventEnd.getHours() < 10
                        ? "0" + eventEnd.getHours()
                        : eventEnd.getHours()) +
                        ":" +
                        (eventEnd.getMinutes() < 10
                          ? "0" + eventEnd.getMinutes()
                          : eventEnd.getMinutes())}
                    </p>
                  </div>
                </div>
              ) : null;
            })}

            <div className="absolute w-full h-[1px] bg-black top-[50%] left-0 -z-10"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
