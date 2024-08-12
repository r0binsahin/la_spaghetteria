import { integer, pgTable, varchar, serial, text } from 'drizzle-orm/pg-core';

export const booking = pgTable('bookings', {
  id: serial('id').primaryKey(),
  date: varchar('date').notNull(),
  time: varchar('time').notNull(),
  amount: integer('amount').default(0).notNull(),
  fullname: varchar('fullname').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
});
