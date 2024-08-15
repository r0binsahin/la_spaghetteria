'use client';

import './render-all-bookings.css';

import * as Components from '../index';

import { useEffect, useState } from 'react';

import { Booking } from '@/types/booking';

import { deleteBooking, getBookings, updateBooking } from '@/app/actions';

import Fuse from 'fuse.js';
import { Stats } from '@/types/stats';
import { calculateDailyStats } from '@/logic/calculateDailyStats';

export const RenderAllBookings = () => {
  const now = new Date().toLocaleDateString('sv-SE');
  const [isLoading, setIsLoading] = useState(true);

  const [fuse, setFuse] = useState<Fuse<Booking> | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [originalBookings, setOriginalBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState(now);

  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

  const [dayStats, setDayStats] = useState<Stats>({
    totalTables18: 0,
    totalGuests18: 0,
    totalTables21: 0,
    totalGuests21: 0,
    totalBookings: 0,
    totalGuests: 0,
    totalTablesBooked: 0,
  });

  const fetchBookingsForDate = async (date: string) => {
    setIsLoading(true);
    try {
      const fetchedBookings = await getBookings();
      const filteredBookings = fetchedBookings.filter(
        (booking: Booking) => booking.date === date
      );
      setOriginalBookings(filteredBookings);
      setBookings(filteredBookings);
      setFuse(new Fuse(fetchedBookings, { keys: ['fullname'] }));

      const stats = calculateDailyStats(filteredBookings);
      setDayStats(stats);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    const currentDate = now;
    fetchBookingsForDate(currentDate);
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
      (booking) => booking.time === time && booking.date === selectedDate
    );
    setBookings(timeFilteredBookings);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedDate(value);
    fetchBookingsForDate(value);
  };

  return (
    <div className='data-wrapper'>
      {isLoading ? (
        <Components.LoaderSpiner />
      ) : (
        <div className='container'>
          {selectedBooking ? (
            <Components.UpdateBookingForm
              booking={selectedBooking}
              onUpdate={handleUpdateSubmit}
              onCancel={handleUpdateCancel}
            />
          ) : (
            <>
              <Components.Search
                handleChange={handleChange}
                searchTerm={searchTerm}
              />
              <h1 className='title'>
                Bookings for {selectedDate === now ? 'today' : selectedDate}
              </h1>
              <div className='time-btns'>
                <div>
                  <label htmlFor='date'>Date:</label>
                  <input
                    type='date'
                    id='date'
                    name='date'
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
                <button onClick={() => handleTimeFilter('18:00')}>18:00</button>
                <button onClick={() => handleTimeFilter('21:00')}>21:00</button>
              </div>

              <Components.DailyStats
                stats={dayStats}
                selectedDate={selectedDate}
              />

              {bookings.length === 0 ? (
                <h1>No booking to show</h1>
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
                          <td data-label='Date'>{booking.date}</td>
                          <td data-label='Time'>{booking.time}</td>
                          <td data-label='Amount'>{booking.amount}</td>
                          <td data-label='Full Name'>{booking.fullname}</td>
                          <td data-label='Email'>{booking.email}</td>
                          <td data-label='Phone'>{booking.phone}</td>
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
                          <Components.DeleteButtons
                            handleDeleteConfirm={handleDeleteConfirm}
                            handleDeleteCancel={handleDeleteCancel}
                          />
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
