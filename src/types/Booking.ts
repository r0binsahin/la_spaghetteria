import { Guest } from './Guest';

export type Booking = {
  date: string;
  time: string;
  amount: number;
  guest: Guest;
};
