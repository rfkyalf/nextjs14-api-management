'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type FilterSelectProps = {
  options: { value: string; name: string }[];
  paramKey: string;
  label: string;
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  paramKey,
  label,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set(paramKey, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
      <select
        className="bg-neutral-400 w-full"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get(paramKey) || ''}
      >
        <option value="">{label}:</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </form>
  );
};

const STATUS = [
  { value: 'airing', name: 'Airing' },
  { value: 'upcoming', name: 'Upcoming' },
  { value: 'complete', name: 'Complete' },
];

const TYPE = [
  { value: 'tv', name: 'TV' },
  { value: 'movie', name: 'Movie' },
  { value: 'ova', name: 'OVA' },
  { value: 'special', name: 'Special' },
  { value: 'ona', name: 'ONA' },
  { value: 'music', name: 'Music' },
  { value: 'cm', name: 'CM' },
  { value: 'pv', name: 'PV' },
  { value: 'tv_special', name: 'TV Special' },
];

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

const SORT_DIRECTION = [
  { value: 'asc', name: 'Ascending' },
  { value: 'desc', name: 'Descending' },
];

export function FilterByStatus() {
  return <FilterSelect options={STATUS} paramKey="status" label="Status" />;
}

export function FilterByType() {
  return <FilterSelect options={TYPE} paramKey="type" label="Type" />;
}

export function SortByOrder() {
  return (
    <FilterSelect options={ORDER_BY} paramKey="order_by" label="Order by" />
  );
}

export function SortDirection() {
  return <FilterSelect options={SORT_DIRECTION} paramKey="sort" label="Sort" />;
}
