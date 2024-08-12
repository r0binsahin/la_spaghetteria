'use client';

import styles from './page.module.css';
import * as Components from '../components/index';
import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState(1);

  const handleTimeSelect = (time: string) => {
    setTime(time);
  };

  return (
    <main className={styles.main}>
      <Components.Calendar date={date} setDate={setDate} />
      <Components.PickTime
        onTimeSelect={handleTimeSelect}
        selectedTime={time}
      />
      <Components.GuestAmount amount={amount} setAmount={setAmount} />
    </main>
  );
}
