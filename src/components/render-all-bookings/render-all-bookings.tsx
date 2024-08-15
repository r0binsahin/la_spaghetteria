'use client';

import './render-all-bookings.css';

import * as Components from '../index';

import { useEffect, useState } from 'react';

import { Booking } from '@/types/booking';

import { deleteBooking, getBookings, updateBooking } from '@/app/actions';

import Fuse from 'fuse.js';

export const RenderAllBookings = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [fuse, setFuse] = useState<Fuse<Booking> | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [originalBookings, setOriginalBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings();
      const todaysBookings = fetchedBookings.filter(
        (booking: Booking) =>
          booking.date === new Date().toLocaleDateString('sv-SE')
      );

      setOriginalBookings(todaysBookings);
      setBookings(todaysBookings);
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
        setBookings(originalBookings);
      } else {
        const results = fuse.search(inputValue);
        const searchResult = results.map((result) => result.item);
        setBookings(searchResult);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTimeFilter = (time: string) => {
    const timeFilteredBookings = originalBookings.filter(
      (booking) => booking.time === time
    );
    setBookings(timeFilteredBookings);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOriginalBookings((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className='data-wrapper'>
      {isLoading ? (
        <Components.LoaderSpiner />
      ) : (
        <div className='container'>
          <Components.Search
            handleChange={handleChange}
            searchTerm={searchTerm}
          />
          {selectedBooking ? (
            <Components.UpdateBookingForm
              booking={selectedBooking}
              onUpdate={handleUpdateSubmit}
              onCancel={handleUpdateCancel}
            />
          ) : (
            <>
              <h1 className='title'>Todays Bookings</h1>
              <div className='time-btns'>
                <div>
                  <label htmlFor='date'>Date:</label>
                  <input
                    type='date'
                    id='date'
                    name='date'
                    value={new Date().toLocaleDateString('sv-SE')}
                    onChange={handleDateChange}
                  />
                </div>
                <button onClick={() => handleTimeFilter('18:00')}>18:00</button>
                <button onClick={() => handleTimeFilter('21:00')}>21:00</button>
              </div>
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
                              <p>
                                Are you sure you want to delete this booking?
                              </p>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};
