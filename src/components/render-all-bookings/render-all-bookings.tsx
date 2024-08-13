'use client';

import { useEffect, useState } from 'react';
import './render-all-bookings.css';
import { Booking } from '@/types/booking';
import { deleteBooking, getBookings, updateBooking } from '@/app/actions';
import { UpdateBookingForm } from '../update-booking-form/update-booking-form';

export const RenderAllBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    const fetchedBookings = await getBookings();
    setBookings(fetchedBookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleUpdateSubmit = async (updatedBooking: Booking) => {
    try {
      await updateBooking(updatedBooking);
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const handleUpdateCancel = () => {
    setSelectedBooking(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>All Bookings</h1>
      {selectedBooking ? (
        <UpdateBookingForm
          booking={selectedBooking}
          onUpdate={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
        />
      ) : (
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
                    onClick={() => handleUpdate(booking)}
                  >
                    Update
                  </button>
                  <button
                    className='delete-button'
                    onClick={() => handleDelete(booking.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
