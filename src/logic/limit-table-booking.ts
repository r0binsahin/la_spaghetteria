import { Booking } from '@/types/booking';

export const limitTableBooking = (bookings: Booking[], newBooking: Booking) => {
  const earlySitting = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date).toISOString().split('T')[0];
    return booking.time === '18:00' && bookingDate === newBooking.date;
  });

  const lateSitting = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date).toISOString().split('T')[0];
    return booking.time === '21:00' && bookingDate === newBooking.date;
  });

  const bookedTables18 = earlySitting.map((booking) =>
    Math.ceil(booking.amount / 6)
  );
  const totalTablesBooked18 = bookedTables18.reduce((acc, val) => acc + val, 0);

  const bookedTables21 = lateSitting.map((booking) =>
    Math.ceil(booking.amount / 6)
  );
  const totalTablesBooked21 = bookedTables21.reduce((acc, val) => acc + val, 0);

  return { totalTablesBooked18, totalTablesBooked21 };
};
