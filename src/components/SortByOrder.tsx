'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type OrderByProps = { value: string; name: string };

const ORDER_BY = [
  { value: 'mal_id', name: 'Mal id' },
  { value: 'title', name: 'Title' },
  { value: 'start_date', name: 'Start date' },
  { value: 'end_date', name: 'End date' },
  { value: 'episodes', name: 'Episodes' },
  { value: 'score', name: 'Score' },
  { value: 'scored_by', name: 'Scored by' },
  { value: 'rank', name: 'Rank' },
  { value: 'popularity', name: 'Popularity' },
  { value: 'members', name: 'Members' },
  { value: 'favorites', name: 'Favorites' },
];

export default function SortByOrder() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortByOrder = (orderBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('order_by', orderBy);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <select
          className="bg-neutral-400 w-full"
          onChange={(e) => handleSortByOrder(e.target.value)}
          defaultValue={searchParams.get('order_by')?.toString()}
        >
          <option value={''} defaultValue={''}>
            Order by:
          </option>
          {ORDER_BY.map((orderBy: OrderByProps, index: number) => (
            <option key={index} value={orderBy.value}>
              {orderBy.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
