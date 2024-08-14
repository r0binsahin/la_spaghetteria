import './guest-amount.css';

interface GuestAmountProps {
  amount: number;
  setAmount: (amount: number) => void;
}

export const GuestAmount = ({ amount, setAmount }: GuestAmountProps) => {
  const amountAlternatives = [
    { value: 1, label: '1 person' },
    { value: 2, label: '2 persons' },
    { value: 3, label: '3 persons' },
    { value: 4, label: '4 persons' },
    { value: 5, label: '5 persons' },
    { value: 6, label: '6 persons' },
    { value: 7, label: '7 persons' },
    { value: 8, label: '8 persons' },
    { value: 9, label: '9 persons' },
    { value: 10, label: '10 persons' },
    { value: 11, label: '11 persons' },
    { value: 12, label: '12 persons (Max)' },
  ];

  return (
    <div className='guest-amount-container'>
      <h2 className='guest-amount-title'>Guest Amount</h2>
      <div className='guest-amount-form'>
        <label htmlFor='guestAmount' className='guest-amount-label'>
          Select Amount of Guests:
        </label>
        <select
          id='guestAmount'
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className='guest-amount-select'
        >
          {amountAlternatives.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
