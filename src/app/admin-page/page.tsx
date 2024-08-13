import styles from '../page.module.css';
import * as Components from '@/components/index';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <SignedOut>
        Please <SignInButton />
        to create a new ad!
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Components.RenderAllBookings />
      </SignedIn>
    </main>
  );
}
