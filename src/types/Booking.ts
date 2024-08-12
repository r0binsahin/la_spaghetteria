export type Guest = {
  fullname: string;
  email: string;
  phone: string;
};

export type Booking = {
  date: string;
  time: string;
  amount: number;
  guest: Guest;
};
