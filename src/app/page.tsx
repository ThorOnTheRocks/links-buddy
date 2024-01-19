import { ReactNode } from 'react';
import { DropdownField } from '@/components/Fields/DropdownField/DropdownField';
import { LinkIcon } from '@heroicons/react/16/solid';

export default function Home(): ReactNode {
  return (
    <main>
      <h1>DevLinks</h1>
      <DropdownField icon={<LinkIcon />} itemsList={[]} />
    </main>
  );
}
