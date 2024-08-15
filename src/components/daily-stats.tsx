import { Stats } from '@/types/stats';

interface DailyStatsProps {
  stats: Stats;
  selectedDate: string;
}
export const DailyStatistics = ({ stats, selectedDate }: DailyStatsProps) => {
  return (
    <div className='day-statistics'>
      <h2>Statistics for {selectedDate}</h2>
      <p>Total booked tables at 18:00: {stats.totalTables18}</p>
      <p>Total guests at 18:00: {stats.totalGuests18}</p>
      <p>Total booked tables at 21:00: {stats.totalTables21}</p>
      <p>Total guests at 21:00: {stats.totalGuests21}</p>
      <p>Total bookings: {stats.totalBookings}</p>
      <p>Total guests: {stats.totalGuests}</p>
    </div>
  );
};
