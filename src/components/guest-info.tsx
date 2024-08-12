export type Guest = {
  fullname: string;
  email: string;
  phone: string;
};

interface GuestInfoProps {
  guest: Guest;
  setGuestName: (name: string) => void;
  setGuestEmail: (email: string) => void;
  setGuestPhone: (phone: string) => void;
}
export const GuestInfo = ({
  guest,
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
          value={guest.fullname}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder='Enter your full name'
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={guest.email}
          onChange={(e) => setGuestEmail(e.target.value)}
          placeholder='Enter your email'
        />
      </div>
      <div>
        <label htmlFor='phone'>Phone Number:</label>
        <input
          type='tel'
          id='phone'
          value={guest.phone}
          onChange={(e) => setGuestPhone(e.target.value)}
          placeholder='Enter your phone number'
        />
      </div>
      <h2>guest info</h2>
      <p>{guest.fullname}</p>
      <p>{guest.email}</p>
      <p>{guest.phone}</p>
    </>
  );
};
