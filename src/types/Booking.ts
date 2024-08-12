import { Guest } from './guest';

export type Booking = {
  date: string;
  time: string;
  amount: number;
  guest: Guest;
};
