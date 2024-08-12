'use client';

import styles from './page.module.css';
import * as Components from '../components/index';
import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <main className={styles.main}>
      <Components.Calendar date={date} setDate={setDate} />
    </main>
  );
}
