'use client';

import ReactCalendar from 'react-calendar';
import '../styles/react-calender.css';

interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
  isDatePicked: boolean;
  setIsDatePicket: (isDatePicked: boolean) => void;
}

export const Calendar = ({
  date,
  setDate,
  setIsDatePicket,
  isDatePicked,
}: CalendarProps) => {
  const now = new Date();

  return (
    <>
      <ReactCalendar
        minDate={now}
        view='month'
        className='REACT-CALENDAR p-2'
        //@ts-ignore
        onChange={setDate}
        value={date}
        locale='sv-SE'
      />
      <p>Selected Date: {date.toDateString()}</p>
      <button onClick={() => setIsDatePicket(!isDatePicked)}>next</button>
    </>
  );
};
