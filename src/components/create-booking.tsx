import { useEffect, useState } from 'react';
import * as Components from './index';
import { Booking } from '@/types/booking';

import { createNewBooking, getBookings } from '@/app/actions';

export const CreateBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const handleTimeSelect = (time: string) => {
    setTime(time);
  };

  const newBooking: Booking = {
    date: date.toLocaleDateString('sv-SE'),
    time: time,
    amount: amount,
    fullname: guestName,
    email: guestEmail,
    phone: guestPhone,
  };

  const createBooking = async () => {
    await createNewBooking(newBooking);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
      setIsLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Components.Calendar date={date} setDate={setDate} />
          <Components.GuestAmount amount={amount} setAmount={setAmount} />
          <Components.PickTime
            bookings={bookings}
            selectedTime={time}
            onTimeSelect={handleTimeSelect}
            newBooking={newBooking!}
          />
          <Components.GuestInfo
            booking={newBooking}
            setGuestName={setGuestName}
            setGuestEmail={setGuestEmail}
            setGuestPhone={setGuestPhone}
          />
          <button onClick={createBooking}>Submit booking</button>
        </>
      )}
    </>
  );
};
