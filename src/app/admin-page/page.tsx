import './admin-page.css';
import * as Components from '@/components/index';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function AdminPage() {
  return (
    <main className='button-wrapper'>
      <h1>La Spaghetteria Admin Page</h1>
      <SignedOut>
        <div className='signed-out'>Please sign in to manage bookings!</div>
        <span className='sign-in-button'>
          <SignInButton />
        </span>{' '}
      </SignedOut>
      <SignedIn>
        <div className='signed-in'>
          <span className='user-button'>
            <UserButton />
          </span>
          <div className='render-all-bookings'>
            <Components.RenderAllBookings />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
