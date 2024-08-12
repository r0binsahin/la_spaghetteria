CREATE TABLE IF NOT EXISTS "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" varchar NOT NULL,
	"time" varchar NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"fullname" varchar NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL
);
