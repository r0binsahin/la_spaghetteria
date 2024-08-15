import './navbar.css';
import { Dancing_Script } from 'next/font/google';

import { Logo } from '@/assets/logo';
import Link from 'next/link';
const dancing = Dancing_Script({ subsets: ['latin'] });

export const Navbar = () => {
  return (
    <nav>
      <div className='topnav'>
        <div className='logo-box'>
          <Logo />
        </div>
        <Link href='/' className={`${dancing.className} title`}>
          La Spaghetteria
        </Link>
      </div>

      <Link href='/admin-page' className='admin-page-link'>
        Admin page
      </Link>
    </nav>
  );
};
