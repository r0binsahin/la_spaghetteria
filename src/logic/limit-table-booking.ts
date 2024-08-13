import { Booking } from '@/types/booking';

export const limitTableBooking = (bookings: Booking[], newBooking: Booking) => {
  const earlySitting = bookings.filter((booking) => {
    booking.time === '18:00' && booking.date === newBooking.date;
  });

  const lateSitting = bookings.filter((booking) => {
    booking.time === '21:00' && booking.date === newBooking.date;
  });

  const bookedTables18 = earlySitting.map((booking) => {
    const bookedTables = Math.ceil(booking.amount / 6);
    return bookedTables;
  });

  const totalTablesBooked18 = bookedTables18.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );

  const bookedTables21 = lateSitting.map((booking) => {
    const bookedTables = Math.ceil(booking.amount / 6);
    return bookedTables;
  });

  const totalTablesBooked21 = bookedTables21.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );

  /*what to handle from here:  
      if (totalTablesBooked18 >= 15) {
      setDisable18(true);
    }
    if (totalTablesBooked21 >= 15) {
      setDisable21(true);
    }

    if (totalTablesBooked18 === 14 && guestAmount > 6) setDisable18(true);
    if (totalTablesBooked21 === 14 && guestAmount > 6) setDisable21(true);
  
  */

  return {
    totalTablesBooked18: totalTablesBooked18,
    totalTablesBooked21: totalTablesBooked21,
  };
};
