import { RenderAllBookings } from '@/components/render-all-bookings/render-all-bookings';
import styles from '../page.module.css';
import * as Components from '@/components/index';

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <RenderAllBookings />
    </main>
  );
}
