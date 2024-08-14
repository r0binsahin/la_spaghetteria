import { Booking } from '@/types/booking';
import './guest-info.css';

interface GuestInfoProps {
  booking: Booking;
  setGuestName: (name: string) => void;
  setGuestEmail: (email: string) => void;
  setGuestPhone: (phone: string) => void;
}
export const GuestInfo = ({
  booking,
  setGuestName,
  setGuestEmail,
  setGuestPhone,
}: GuestInfoProps) => {
  return (
    <div className='guest-info-container'>
      <h2 className='guest-info-title'>Guest Information</h2>
      <div className='guest-info-form'>
        <div className='guest-info-field'>
          <label htmlFor='fullName' className='guest-info-label'>
            Full Name:
          </label>
          <input
            type='text'
            id='fullName'
            value={booking.fullname}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder='Enter your full name'
            className='guest-info-input'
          />
        </div>
        <div className='guest-info-field'>
          <label htmlFor='email' className='guest-info-label'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={booking.email}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder='Enter your email'
            className='guest-info-input'
          />
        </div>
        <div className='guest-info-field'>
          <label htmlFor='phone' className='guest-info-label'>
            Phone Number:
          </label>
          <input
            type='tel'
            id='phone'
            value={booking.phone}
            onChange={(e) => setGuestPhone(e.target.value)}
            placeholder='Enter your phone number'
            className='guest-info-input'
          />
        </div>
      </div>
      <div className='guest-info-summary'>
        <h3 className='guest-info-summary-title'>Guest Information Summary</h3>
        <p className='guest-info-summary-item'>Name: {booking.fullname}</p>
        <p className='guest-info-summary-item'>Email: {booking.email}</p>
        <p className='guest-info-summary-item'>Phone: {booking.phone}</p>
      </div>
    </div>
  );
};
