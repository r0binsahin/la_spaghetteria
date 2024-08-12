'use client';

import ReactCalendar from 'react-calendar';
import '../styles/react-calender.css';

export const Calendar = () => {
  const now = new Date();
  return (
    <>
      <ReactCalendar
        minDate={now}
        view='month'
        className='REACT-CALENDAR p-2'
      />
    </>
  );
};
