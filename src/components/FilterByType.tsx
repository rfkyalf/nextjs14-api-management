'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TypeProps = { value: string; name: string };

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

export default function FilterByType() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterByType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('type', type);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <select
          className="bg-neutral-400 w-full"
          onChange={(e) => handleFilterByType(e.target.value)}
          defaultValue={searchParams.get('type')?.toString()}
        >
          <option value={''} defaultValue={''}>
            Type:
          </option>
          {TYPE.map((type: TypeProps, index) => (
            <option key={index} value={type.value}>
              {type.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
