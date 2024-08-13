import { Booking } from '@/types/booking';
import { db } from './db';
import { booking } from './db/schema';
import { eq } from 'drizzle-orm';

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

export const queryDeleteBooking = async (id: number) => {
  await db.delete(booking).where(eq(booking.id, id));
};

export const queryUpdateBooking = async (updatedBooking: Booking) => {
  if (!updatedBooking.id) {
    throw new Error('Booking ID is required for update');
  }

  try {
    const result = await db
      .update(booking)
      .set({
        date: updatedBooking.date,
        time: updatedBooking.time,
        amount: updatedBooking.amount,
        fullname: updatedBooking.fullname,
        email: updatedBooking.email,
        phone: updatedBooking.phone,
      })
      .where(eq(booking.id, updatedBooking.id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error in queryUpdateBooking:', error);
    throw error;
  }
};
