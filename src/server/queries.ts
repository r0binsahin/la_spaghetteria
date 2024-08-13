import { Booking } from '@/types/booking';
import { db } from './db';
import { booking } from './db/schema';

export const queryCreateBooking = async (newBooking: Booking) => {
  await db.insert(booking).values({
    date: newBooking.date,
    time: newBooking.time,
    amount: newBooking.amount,
    fullname: newBooking.fullname,
    email: newBooking.email,
    phone: newBooking.phone,
  });
};

export const queryGetBookings = async () => {
  const bookingArray: Booking[] = await db.select().from(booking);
  return bookingArray;
};
