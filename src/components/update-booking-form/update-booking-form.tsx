'use client';
import './update-booking-form.css';
import React, { useState } from 'react';
import { Booking } from '@/types/booking';

interface UpdateBookingFormProps {
  booking: Booking;
  onUpdate: (updatedBooking: Booking) => void;
  onCancel: () => void;
}

export const UpdateBookingForm = ({
  booking,
  onUpdate,
  onCancel,
}: UpdateBookingFormProps) => {
  const [updatedBooking, setUpdatedBooking] = useState<Booking>(booking);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBooking);
  };

  return (
    <form onSubmit={handleSubmit} className='update-form'>
      <h2>Update Booking</h2>
      <div>
        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={updatedBooking.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='time'>Time:</label>
        <input
          type='time'
          id='time'
          name='time'
          value={updatedBooking.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='amount'>Amount:</label>
        <input
          type='number'
          id='amount'
          name='amount'
          value={updatedBooking.amount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='fullname'>Full Name:</label>
        <input
          type='text'
          id='fullname'
          name='fullname'
          value={updatedBooking.fullname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={updatedBooking.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='phone'>Phone:</label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={updatedBooking.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-actions'>
        <button type='submit'>Update</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
