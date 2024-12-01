'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Limit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (!isNaN(Number(value)) && Number(value) > 0) {
      params.set('page', '1');
      params.set('limit', value);
      router.replace(`${pathname}?${params.toString()}`);
    }

    if (
      Number(value) === 0 ||
      isNaN(Number(value)) ||
      value === '' ||
      Number(value) > 25
    ) {
      params.delete('limit');
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md flex items-center gap-x-2">
      <label htmlFor="limit">Limit:</label>
      <input
        id="limit"
        type="string"
        className="bg-neutral-400 w-full placeholder-neutral-700"
        min="1"
        placeholder="1-25"
        defaultValue={searchParams.get('limit') || ''}
        onChange={handleLimitChange}
      />
    </form>
  );
}
