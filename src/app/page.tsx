'use client';

import styles from './page.module.css';
import * as Components from '../components/index';
import { useState } from 'react';
import { Guest } from '../types/guest';
import { Booking } from '../types/booking';

const bookings: Booking[] = [];

export default function Home() {
  const [booking, setBooking] = useState<Booking | null>(null);
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

  const createBooking = () => {
    const newBooking: Booking = {
      date: date.toString(),
      time: time,
      amount: amount,
      guest: guest,
    };

    bookings.push(newBooking);
    console.log(bookings);
  };

  return (
    <main className={styles.main}>
      <Components.Calendar date={date} setDate={setDate} />
      <Components.PickTime
        onTimeSelect={(date) => handleTimeSelect(date)}
        selectedTime={time}
      />
      <Components.GuestAmount amount={amount} setAmount={setAmount} />
      <Components.GuestInfo
        guest={guest}
        setGuestName={setGuestName}
        setGuestEmail={setGuestEmail}
        setGuestPhone={setGuestPhone}
      />

      <button onClick={createBooking}> Create Booking</button>
    </main>
  );
}
