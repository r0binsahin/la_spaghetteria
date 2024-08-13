import { Booking } from '@/types/booking';
import { db } from './db';
import { booking } from './db/schema';

export const queryCreateBooking = async (newBooking: Booking) => {
  await db.insert(booking).values({
    date: newBooking.date,
    time: newBooking.time,
    amount: newBooking.amount,
    fullname: newBooking.guest.fullname,
    email: newBooking.guest.email,
    phone: newBooking.guest.phone,
  });
};
