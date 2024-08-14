import './search.css';

import { FiSearch } from 'react-icons/fi';

interface SearchProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export const Search = ({ searchTerm, handleChange }: SearchProps) => {
  return (
    <div className='searchBox'>
      <input
        type='text'
        className='searchInput'
        placeholder='Search booking by fullname'
        value={searchTerm}
        onChange={handleChange}
      />
      <button className='searchButton'>
        <FiSearch color='#fff' size={'1.5rem'} />
      </button>
    </div>
  );
};
