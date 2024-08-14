import Link from 'next/link';
import './slide-show.css';

export const SlideShow = () => {
  return (
    <div className='slide-container'>
      <div className='page-title'>
        <div className='welcome'>
          <h1>Benvenuti a La Spaghetteria </h1>
        </div>

        <Link href={'/book-table'} className='book-table-btn'>
          Book a table
        </Link>
      </div>
      <div className='slider'>
        <div className='slides'>
          <div className='slide'>
            <img src='https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
          </div>
          <div className='slide'>
            <img src='https://images.unsplash.com/photo-1534425582704-65e021820688?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
          </div>
          <div className='slide'>
            <img src='https://images.unsplash.com/photo-1556442281-77c90134c61f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
          </div>
          <div className='slide'>
            <img src='https://images.unsplash.com/photo-1593548615309-5a45c504f994?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
          </div>
        </div>
      </div>
    </div>
  );
};
