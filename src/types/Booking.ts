import { Guest } from './Guest';

export type Booking = {
  date: string;
  time: string;
  amountOfGuests: number;
  guest: Guest;
};
