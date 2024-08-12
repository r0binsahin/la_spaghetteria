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

  const options = amountAlternatives.map((amount) => (
    <option value={amount.value}>{amount.label}</option>
  ));

  return (
    <>
      <label htmlFor='guestAmount'>Select Amount of Guests: </label>
      <select
        id='guestAmount'
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      >
        {amountAlternatives.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Amount: {amount}</p>
    </>
  );
};
