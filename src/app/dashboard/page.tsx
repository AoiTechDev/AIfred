import Calendar from '@/components/Calendar'
import { DatePicker } from '@/components/DatePicker'
import React from 'react'
import { createCalendarEvent } from '../actions/action'

const tasksArray = [
  { address: 'Zawiła 54, Kraków' },
  { address: 'Grunwaldzka 23, Warszawa' },
  { address: 'Powstańców Wielkopolskich 13, Katowice' },
  { address: 'Szujskiego 13, Tarnów' },
]

const CalendarDashboard = async () => {
  const kalendarz = await createCalendarEvent()
  return (
    <div className="w-full border-2 rounded-lg p-4 order-1 lg:order-2">
      <DatePicker/>
      <Calendar kalendarz={kalendarz} />
      
    </div>
  )
}

export default CalendarDashboard
