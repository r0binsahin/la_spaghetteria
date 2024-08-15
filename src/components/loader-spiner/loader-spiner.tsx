import './loader-spiner.css';
import { FiCommand } from 'react-icons/fi';

export const LoaderSpiner = () => {
  return (
    <div className='loader'>
      <FiCommand className='loading-icon' />;
    </div>
  );
};
