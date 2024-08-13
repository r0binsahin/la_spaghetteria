'use client';

import { limitTableBooking } from '@/logic/limit-table-booking';
import { Booking } from '@/types/booking';
import { useEffect, useState } from 'react';

interface PickTimeProps {
  bookings: Booking[];
  newBooking: Booking;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export const PickTime = ({
  onTimeSelect,
  selectedTime,
  bookings,
  newBooking,
}: PickTimeProps) => {
  const [disable18, setDisable18] = useState(false);
  const [disable21, setDisable21] = useState(false);
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    onTimeSelect(time);
  };

  const handleDisabled = () => {
    const totalTables = limitTableBooking(bookings, newBooking);

    if (totalTables.totalTablesBooked18 >= 15) {
      setDisable18(true);
    }
    if (totalTables.totalTablesBooked21 >= 15) {
      setDisable21(true);
    }

    if (totalTables.totalTablesBooked18 === 14 && newBooking.amount > 6)
      setDisable18(true);
    if (totalTables.totalTablesBooked21 === 14 && newBooking.amount > 6)
      setDisable21(true);
  };

  useEffect(() => {
    handleDisabled();
  }, []);

  return (
    <div>
      <h2>Select a Time:</h2>
      <div>
        <input
          type='radio'
          id='time1800'
          name='time'
          value='18:00'
          disabled={disable18}
          checked={selectedTime === '18:00'}
          onChange={handleTimeChange}
        />
        <label htmlFor='time1800'>18:00</label>
      </div>
      <div>
        <input
          type='radio'
          id='time2100'
          name='time'
          value='21:00'
          disabled={disable21}
          checked={selectedTime === '21:00'}
          onChange={handleTimeChange}
        />
        <label htmlFor='time2100'>21:00</label>
      </div>
      <div>
        <p>Selected Time: {selectedTime}</p>

        {disable18 && disable21 && (
          <h1>We are fully booked. Please check another date</h1>
        )}
      </div>
    </div>
  );
};
