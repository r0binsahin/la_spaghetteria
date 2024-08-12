interface PickTimeProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export const PickTime = ({ onTimeSelect, selectedTime }: PickTimeProps) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    onTimeSelect(time);
  };

  return (
    <div>
      <h2>Select a Time:</h2>
      <div>
        <input
          type='radio'
          id='time1800'
          name='time'
          value='18:00'
          checked={selectedTime === '18:00'}
          onChange={handleTimeChange}
        />
        <label htmlFor='time1800'>18:00</label>
      </div>
      <div>
        <input
          type='radio'
          id='time2100'
          name='time'
          value='21:00'
          checked={selectedTime === '21:00'}
          onChange={handleTimeChange}
        />
        <label htmlFor='time2100'>21:00</label>
      </div>
      <div>
        <p>Selected Time: {selectedTime}</p>
      </div>
    </div>
  );
};
