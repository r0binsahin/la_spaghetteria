import './search.css';

import { FiSearch } from 'react-icons/fi';

interface ISearchProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export const Search = ({
  searchTerm,
  handleChange,
}: ISearchProps): JSX.Element => {
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
