import { useState } from 'react';
import * as Components from './index';

export const CreateBooking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePicked, setIsDatePicket] = useState(false);
  return (
    <>
      {!isDatePicked ? (
        <Components.Calendar
          date={date}
          setDate={setDate}
          isDatePicked={isDatePicked}
          setIsDatePicket={setIsDatePicket}
        />
      ) : (
        'hej'
      )}
    </>
  );
};
