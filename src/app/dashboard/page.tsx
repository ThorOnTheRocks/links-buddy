import { getAuth } from '@/features/Auth/lib/cookie';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { session, user } = await getAuth();
  if (!session) {
    redirect('/');
  }
  return <div>Welcome {`${user?.username || user?.name}`}!</div>;
}
