'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SortDirectionProps = { value: string; name: string };

const SORT_DIRECTION = [
  { value: 'asc', name: 'Ascending' },
  { value: 'desc', name: 'Descending' },
];

export default function SortDirection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortDirection = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('sort', sort);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <select
          className="bg-neutral-400 w-full"
          onChange={(e) => handleSortDirection(e.target.value)}
          defaultValue={searchParams.get('sort')?.toString()}
        >
          <option value={''} defaultValue={''}>
            Sort:
          </option>
          {SORT_DIRECTION.map((orderBy: SortDirectionProps, index: number) => (
            <option key={index} value={orderBy.value}>
              {orderBy.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
