import { useState } from 'react';
import * as Components from './index';

export const CreateBooking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState(1);
  const [isDatePicked, setIsDatePicket] = useState(false);
  const [isAmountPicked, setIsAmountPicket] = useState(false);
  return (
    <>
      {!isDatePicked ? (
        <Components.Calendar
          date={date}
          setDate={setDate}
          isDatePicked={isDatePicked}
          setIsDatePicket={setIsDatePicket}
        />
      ) : !isAmountPicked ? (
        <Components.GuestAmount
          amount={amount}
          setAmount={setAmount}
          isAmountPicked={isAmountPicked}
          setIsAmountPicket={setIsAmountPicket}
        />
      ) : (
        'hej'
      )}
    </>
  );
};
