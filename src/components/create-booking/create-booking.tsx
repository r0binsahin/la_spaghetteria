'use client';

import './create-booking.css';
import { useEffect, useState, useCallback, FormEvent } from 'react';
import * as Components from '../index';
import { Booking } from '@/types/booking';
import { createNewBooking, getBookings } from '@/app/actions';

import { FiCommand } from 'react-icons/fi';
import Link from 'next/link';

type ErrorState = {
  [K in keyof Booking]?: string;
};

export const CreateBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errors, setErrors] = useState<ErrorState>({});
  const [newBooking, setNewBooking] = useState<Booking>({
    date: new Date().toLocaleDateString('sv-SE'),
    time: '',
    amount: 1,
    fullname: '',
    email: '',
    phone: '',
  });

  const setBookingDetails = useCallback((field: keyof Booking, value: any) => {
    setNewBooking((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};
    let isValid = true;

    if (!newBooking.date) {
      newErrors.date = 'Please select a date';
      isValid = false;
    }
    if (!newBooking.time) {
      newErrors.time = 'Please select a time';
      isValid = false;
    }
    if (!newBooking.fullname.trim()) {
      newErrors.fullname = 'Please enter your full name';
      isValid = false;
    }
    if (!newBooking.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newBooking.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!newBooking.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
      isValid = false;
    }
    if (newBooking.amount < 1) {
      newErrors.amount = 'Number of guests must be at least 1';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createNewBooking(newBooking);
      setBookingStatus('success');

      setErrors({});
    } catch (error) {
      console.error('Failed to create booking:', error);
      setBookingStatus('failure');
    }
  };

  return (
    <div className='create-booking-container'>
      {isLoading ? (
        <FiCommand className='loading-icon' />
      ) : (
        <div className='create-booking-container-blur'>
          {bookingStatus === 'failure' ? (
            <div className='booking-failure'>
              <h2>Booking Creation Failed</h2>
              <p>There was an error creating your booking. Please try again.</p>
            </div>
          ) : bookingStatus === 'success' ? (
            <div className='booking-confirmation'>
              <h2>Booking Created Successfully! 🎉</h2>
              <p>
                <strong>Date:</strong> {newBooking.date}
              </p>
              <p>
                <strong>Time:</strong> {newBooking.time}
              </p>
              <p>
                <strong>Number of Guests:</strong> {newBooking.amount}
              </p>
              <p>
                <strong>Name: </strong> {newBooking.fullname}
              </p>
              <p>
                <strong>Email: </strong> {newBooking.email}
              </p>
              <p>
                <strong>Phone: </strong> {newBooking.phone}
              </p>
              <Link href='/' className='back-to-start'>
                Back to start page
              </Link>{' '}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='create-booking-form'>
              <h1 className='create-booking-title'>Create a New Booking</h1>
              <div className='create-booking-section'>
                <Components.Calendar
                  date={new Date(newBooking.date)}
                  setDate={(date) =>
                    setBookingDetails('date', date.toLocaleDateString('sv-SE'))
                  }
                />
                {errors.date && <p className='error'>{errors.date}</p>}
              </div>

              <div className='create-booking-section'>
                <Components.GuestAmount
                  amount={newBooking.amount}
                  setAmount={(amount) => setBookingDetails('amount', amount)}
                />
                {errors.amount && <p className='error'>{errors.amount}</p>}
              </div>

              <div className='create-booking-section'>
                <Components.PickTime
                  bookings={bookings}
                  selectedTime={newBooking.time}
                  onTimeSelect={(time) => setBookingDetails('time', time)}
                  newBooking={newBooking}
                />
                {errors.time && <p className='error'>{errors.time}</p>}
              </div>

              <div className='create-booking-section'>
                <Components.GuestInfo
                  booking={newBooking}
                  setGuestName={(name) => setBookingDetails('fullname', name)}
                  setGuestEmail={(email) => setBookingDetails('email', email)}
                  setGuestPhone={(phone) => setBookingDetails('phone', phone)}
                />
                {errors.fullname && <p className='error'>{errors.fullname}</p>}
                {errors.email && <p className='error'>{errors.email}</p>}
                {errors.phone && <p className='error'>{errors.phone}</p>}
              </div>

              <button type='submit' className='submit-button'>
                Submit Booking
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
