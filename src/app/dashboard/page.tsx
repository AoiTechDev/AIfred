

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Calendar from "@/components/Calendar";
import { DatePicker } from "@/components/DatePicker";
import React from "react";
import { createCalendarEvent } from "../actions/action";
import OptimizeButton from "@/components/OptimizeButton";

const tasksArray = [
  { address: "Zawiła 54, Kraków" },
  { address: "Grunwaldzka 23, Warszawa" },
  { address: "Powstańców Wielkopolskich 13, Katowice" },
  { address: "Szujskiego 13, Tarnów" },
];

const CalendarDashboard = async () => {

  const user = await currentUser();

  if (!user) {
 
    redirect("/");
  };

  const kalendarz = await createCalendarEvent()
  return (
    <div className="w-full overflow border-2 rounded-lg p-4 order-1 lg:order-2">
      <DatePicker />
      <Calendar kalendarz={kalendarz} />
    </div>
  );
};

export default CalendarDashboard;
