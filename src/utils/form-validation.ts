import { Booking } from '@/types/booking';

export const validateBooking = (booking: Booking) => {
  const errors: { [key in keyof Booking]?: string } = {};

  if (!booking.date) errors.date = 'Date is required';
  if (!booking.time) errors.time = 'Time is required';
  if (!booking.fullname) errors.fullname = 'Full name is required';
  if (!booking.email) errors.email = 'Email is required';
  if (!booking.phone) errors.phone = 'Phone number is required';

  return errors;
};
