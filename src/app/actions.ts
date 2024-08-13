'use server';

import { queryCreateBooking } from '@/server/queries';
import { Booking } from '@/types/booking';

export const createNewBooking = async (booking: Booking) => {
  try {
    await queryCreateBooking(booking);
  } catch (error) {
    console.log(error);
  }
};
