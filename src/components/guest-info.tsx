import { Booking } from '@/types/booking';

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
    <>
      <div>
        <label htmlFor='fullName'>Full Name:</label>
        <input
          type='text'
          id='fullName'
          value={booking.fullname}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder='Enter your full name'
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={booking.email}
          onChange={(e) => setGuestEmail(e.target.value)}
          placeholder='Enter your email'
        />
      </div>
      <div>
        <label htmlFor='phone'>Phone Number:</label>
        <input
          type='tel'
          id='phone'
          value={booking.phone}
          onChange={(e) => setGuestPhone(e.target.value)}
          placeholder='Enter your phone number'
        />
      </div>
      <h2>guest info</h2>
      <p>{booking.fullname}</p>
      <p>{booking.email}</p>
      <p>{booking.phone}</p>
    </>
  );
};
