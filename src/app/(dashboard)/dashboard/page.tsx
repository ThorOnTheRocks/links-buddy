import { getAuth } from '@/features/Auth/lib/cookie';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Dashboard() {
  const { session, user } = await getAuth();
  if (!session) {
    redirect('/');
  }
  return <div>Welcome {`${user?.email}`}!</div>;
}
