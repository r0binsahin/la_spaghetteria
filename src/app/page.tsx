'use client';

import styles from './page.module.css';
import * as Components from '../components/index';
import { useState } from 'react';
import { Guest } from '@/types/Guest';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  let guest: Guest = {
    fullname: guestName,
    email: guestEmail,
    phone: guestPhone,
  };

  const handleTimeSelect = (time: string) => {
    setTime(time);
  };

  return (
    <main className={styles.main}>
      <Components.Calendar date={date} setDate={setDate} />
      <Components.PickTime
        onTimeSelect={() => setTime(time)}
        selectedTime={time}
      />
      <Components.GuestAmount amount={amount} setAmount={setAmount} />
      <Components.GuestInfo
        guest={guest}
        setGuestName={setGuestName}
        setGuestEmail={setGuestEmail}
        setGuestPhone={setGuestPhone}
      />
    </main>
  );
}
