'use client';

import styles from './page.module.css';
import * as Components from '../components/index';
import { useState } from 'react';
import { Booking } from '../types/booking';

import { createNewBooking } from './actions';

export default function Home() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const handleTimeSelect = (time: string) => {
    setTime(time);
  };

  const createBooking = async () => {
    const newBooking: Booking = {
      date: date.toString(),
      time: time,
      amount: amount,
      fullname: guestName,
      email: guestEmail,
      phone: guestPhone,
    };

    await createNewBooking(newBooking);
    console.log('booking created');
  };

  return (
    <main className={styles.main}>
      <Components.CreateBooking />
    </main>
  );
}
