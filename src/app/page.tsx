import styles from './page.module.css';
import * as Components from '../components/index';

export default function Home() {
  return (
    <main className={styles.main}>
      <Components.CreateBooking />
    </main>
  );
}
