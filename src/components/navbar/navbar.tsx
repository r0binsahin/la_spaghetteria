'use client';

import './navbar.css';
import { Dancing_Script } from 'next/font/google';
import { FaCircleUser } from 'react-icons/fa6';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

import { Logo } from '@/assets/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dancing = Dancing_Script({ subsets: ['latin'] });

export const Navbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname === '/admin-page';
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

      {isAdminPage ? (
        <div className='login-btn-wrapper'>
          <SignedOut>
            <SignInButton>
              <span className='border-2 border-black px-4 rounded-lg text-base cursor-pointer font-normal'>
                <FaCircleUser className='admin-user-login' />
              </span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>{' '}
        </div>
      ) : (
        <Link href='/admin-page' className='admin-page-link'>
          <FaCircleUser />
        </Link>
      )}
    </nav>
  );
};
