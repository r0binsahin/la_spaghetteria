'use server';

import { queryCreateBooking, queryGetBookings } from '@/server/queries';
import { Booking } from '@/types/booking';

export const createNewBooking = async (booking: Booking) => {
  try {
    await queryCreateBooking(booking);
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = async (): Promise<Booking[]> => {
  try {
    return await queryGetBookings();
  } catch (error) {
    console.log(error);
    return [];
  }
};
