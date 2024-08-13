'use client';

import { useEffect, useState } from 'react';

import './render-all-bookings.css';
import { Booking } from '@/types/booking';
import { getBookings } from '@/app/actions';

export const RenderAllBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const fetchedBookings = await getBookings();
    setBookings(fetchedBookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = (bookingId: string) => {
    // Logic for updating a booking
    console.log('Update booking with ID:', bookingId);
  };

  const handleDelete = (bookingId: string) => {
    // Logic for deleting a booking
    console.log('Delete booking with ID:', bookingId);
  };

  return (
    <div className='container'>
      <h1 className='title'>All Bookings</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.amount}</td>
              <td>{booking.fullname}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td className='actions'>
                <button
                  className='update-button'
                  onClick={() => handleUpdate(booking.email)}
                >
                  Update
                </button>
                <button
                  className='delete-button'
                  onClick={() => handleDelete(booking.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
