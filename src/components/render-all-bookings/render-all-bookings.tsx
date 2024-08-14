'use client';

import { useEffect, useState } from 'react';
import './render-all-bookings.css';
import { Booking } from '@/types/booking';
import { deleteBooking, getBookings, updateBooking } from '@/app/actions';
import { UpdateBookingForm } from '../update-booking-form/update-booking-form';

import { FiCommand } from 'react-icons/fi';

import * as Components from '../index';

import Fuse from 'fuse.js';

export const RenderAllBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fuse, setFuse] = useState<Fuse<Booking> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
      setFilteredBookings(fetchedBookings);
      setFuse(new Fuse(fetchedBookings, { keys: ['fullname'] }));
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
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

  const onSearch = (inputValue: string) => {
    if (fuse) {
      if (inputValue === '') {
        setFilteredBookings(bookings);
      } else {
        const results = fuse.search(inputValue);
        const searchResult = results.map((result) => result.item);
        setFilteredBookings(searchResult);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className='data-wrapper'>
      {isLoading ? (
        <Components.LoaderSpiner />
      ) : (
        <div className='container'>
          <h1 className='title'>All Bookings</h1>
          <Components.Search
            handleChange={handleChange}
            searchTerm={searchTerm}
          />
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
                {filteredBookings.map((booking, index) => (
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
                            <div className='btnContainer'>
                              {' '}
                              <button
                                className='delete-button'
                                onClick={handleDeleteConfirm}
                              >
                                Yes, delete
                              </button>
                              <button
                                onClick={handleDeleteCancel}
                                className='update-button'
                              >
                                Cancel
                              </button>
                            </div>
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
      )}
    </div>
  );
};
