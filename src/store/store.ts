import { CurrentDayEvent } from "@/types/types";
import { create } from "zustand";

type CurrentCalendarDate = {
  date: Date | undefined;
  setCurrentDate: (date: Date | undefined) => void;
};
export const useCalendarStore = create<CurrentCalendarDate>((set) => ({
  date: new Date(),
  setCurrentDate: (date: Date | undefined) => set({ date }),
}));

type CurrentEvent = {
  event: {
    eventId: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
  };
  setCurrentEvent: (event: {
    eventId: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
  }) => void;
};

export const useCurrentEventStore = create<CurrentEvent>((set) => ({
  event: {
    eventId: "",
    name: "",
    description: "",
    start: new Date(),
    end: new Date(),
  },
  setCurrentEvent: (event: {
    eventId: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
  }) => set({ event }),
}));

type CurrentDayAllEvents = {
  currentEvents: CurrentDayEvent[];
  setCurrentDayAllEvents: (currentEvents: CurrentDayEvent[]) => void;
};

export const useCurrentDayAllEventsStore = create<CurrentDayAllEvents>(
  (set) => ({
    currentEvents: [],
    setCurrentDayAllEvents: (currentEvents) => set({ currentEvents }),
  })
);