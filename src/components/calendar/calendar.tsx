'use client';

import ReactCalendar from 'react-calendar';
import './calender.css';

interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const Calendar = ({ date, setDate }: CalendarProps) => {
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
    </>
  );
};
