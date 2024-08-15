import { Booking } from '@/types/booking';
import { Stats } from '@/types/stats';

export const calculateDailyStats = (bookings: Booking[]) => {
  const stats: Stats = {
    totalTables18: 0,
    totalGuests18: 0,
    totalTables21: 0,
    totalGuests21: 0,
    totalBookings: 0,
    totalGuests: 0,
  };

  bookings.forEach((booking) => {
    if (booking.time === '18:00') {
      stats.totalTables18++;
      stats.totalGuests18 += booking.amount;
    } else if (booking.time === '21:00') {
      stats.totalTables21++;
      stats.totalGuests21 += booking.amount;
    }
    stats.totalBookings++;
    stats.totalGuests += booking.amount;
  });

  return stats;
};
