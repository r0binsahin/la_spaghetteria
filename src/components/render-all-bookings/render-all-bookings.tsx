'use client';

import { useEffect, useState } from 'react';
import './render-all-bookings.css';
import { Booking } from '@/types/booking';
import { deleteBooking, getBookings, updateBooking } from '@/app/actions';
import { UpdateBookingForm } from '../update-booking-form/update-booking-form';

export const RenderAllBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

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

  const handleDeleteClick = (id: number) => {
    setBookingToDelete(id);
  };

  const handleDeleteConfirm = async () => {
    if (bookingToDelete) {
      try {
        await deleteBooking(bookingToDelete);
        fetchBookings();
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
    setBookingToDelete(null);
  };

  const handleDeleteCancel = () => {
    setBookingToDelete(null);
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
              <>
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
                      onClick={() => handleDeleteClick(booking.id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {bookingToDelete === booking.id && (
                  <tr>
                    <td colSpan={7}>
                      <div className='delete-confirmation'>
                        <p>Are you sure you want to delete this booking?</p>
                        <button onClick={handleDeleteConfirm}>
                          Yes, delete
                        </button>
                        <button onClick={handleDeleteCancel}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
