'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type StatusProps = { value: string; name: string };

const STATUS = [
  { value: 'airing', name: 'Airing' },
  { value: 'upcoming', name: 'Upcoming' },
  { value: 'complete', name: 'Complete' },
];

export default function FilterByStatus() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterByStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('status', status);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <select
          className="bg-neutral-400 w-full"
          onChange={(e) => handleFilterByStatus(e.target.value)}
          defaultValue={searchParams.get('status')?.toString()}
        >
          <option value={''} defaultValue={''}>
            Status:
          </option>
          {STATUS.map((status: StatusProps, index) => (
            <option key={index} value={status.value}>
              {status.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
