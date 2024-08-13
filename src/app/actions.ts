'use server';

import {
  queryCreateBooking,
  queryDeleteBooking,
  queryGetBookings,
} from '@/server/queries';
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

export const deleteBooking = async (id: number) => {
  try {
    await queryDeleteBooking(id);
  } catch (error) {
    console.log('Error deleting booking:', error);
  }
};
