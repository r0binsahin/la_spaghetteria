import { Stats } from '@/types/stats';
import './daily-stats.css';

interface DailyStatsProps {
  stats: Stats;
  selectedDate: string;
}

export const DailyStats = ({ stats, selectedDate }: DailyStatsProps) => {
  const now = new Date().toLocaleDateString('sv-SE');
  return (
    <div className='daily-statistics'>
      <h2 className='daily-statistics__title'>
        Numbers for bookings of {selectedDate === now ? 'today' : selectedDate}
      </h2>
      <div className='daily-statistics__grid'>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Total tables booked:</span>
          <span className='daily-statistics__value'>
            {stats.totalTablesBooked}
          </span>
        </div>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Total guests:</span>
          <span className='daily-statistics__value'>{stats.totalGuests}</span>
        </div>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Tables at 18:00:</span>
          <span className='daily-statistics__value'>{stats.totalTables18}</span>
        </div>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Tables at 21:00:</span>
          <span className='daily-statistics__value'>{stats.totalTables21}</span>
        </div>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Guests at 18:00:</span>
          <span className='daily-statistics__value'>{stats.totalGuests18}</span>
        </div>

        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Guests at 21:00:</span>
          <span className='daily-statistics__value'>{stats.totalGuests21}</span>
        </div>
        <div className='daily-statistics__item'>
          <span className='daily-statistics__label'>Total bookings:</span>
          <span className='daily-statistics__value'>{stats.totalBookings}</span>
        </div>
      </div>
    </div>
  );
};
