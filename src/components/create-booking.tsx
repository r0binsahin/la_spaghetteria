import { useEffect, useState, useCallback, FormEvent } from 'react';
import * as Components from './index';
import { Booking } from '@/types/booking';
import { createNewBooking, getBookings } from '@/app/actions';

export const CreateBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState<Booking>({
    date: new Date().toLocaleDateString('sv-SE'),
    time: '',
    amount: 1,
    fullname: '',
    email: '',
    phone: '',
  });

  const updateBooking = useCallback((field: keyof Booking, value: any) => {
    setNewBooking((prev) => ({ ...prev, [field]: value }));
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNewBooking(newBooking);
      alert('Booking created successfully!');
      setNewBooking({
        date: new Date().toLocaleDateString('sv-SE'),
        time: '',
        amount: 1,
        fullname: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <Components.Calendar
        date={new Date(newBooking.date)}
        setDate={(date) =>
          updateBooking('date', date.toLocaleDateString('sv-SE'))
        }
      />
      <Components.GuestAmount
        amount={newBooking.amount}
        setAmount={(amount) => updateBooking('amount', amount)}
      />
      <Components.PickTime
        bookings={bookings}
        selectedTime={newBooking.time}
        onTimeSelect={(time) => updateBooking('time', time)}
        newBooking={newBooking}
      />
      <Components.GuestInfo
        booking={newBooking}
        setGuestName={(name) => updateBooking('fullname', name)}
        setGuestEmail={(email) => updateBooking('email', email)}
        setGuestPhone={(phone) => updateBooking('phone', phone)}
      />
      <button type='submit'>Submit booking</button>
    </form>
  );
};
