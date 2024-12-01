import AnimeList from '@/components/AnimeList';
import {
  FilterByStatus,
  FilterByType,
  SortByOrder,
  SortDirection,
} from '@/components/FilterSelect';
// import FilterByStatus from '@/components/FilterByStatus';
// import FilterByType from '@/components/FilterByType';
import Limit from '@/components/Limit';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
// import SortByOrder from '@/components/SortByOrder';
// import SortDirection from '@/components/SortDirection';
import { getAllAnime } from '@/lib/actions';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    order_by?: string;
    type?: string;
    status?: string;
    sort?: string;
    limit?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const orderBy = searchParams?.order_by || '';
  const type = searchParams?.type || '';
  const status = searchParams?.status || '';
  const sort = searchParams?.sort || '';
  const limit = Number(searchParams?.limit) || 25;

  const pages = await getAllAnime(
    query,
    currentPage,
    orderBy,
    type,
    status,
    sort,
    limit
  );
  const totalPages = pages?.totalPages;

  return (
    <main className="w-[1020px] mx-auto">
      <div className="flex items-center gap-x-4 py-4">
        <Search />
        {/* <FilterByType />
        <FilterByStatus />
        <SortByOrder />
        <SortDirection /> */}
        <FilterByStatus />
        <FilterByType />
        <SortByOrder />
        <SortDirection />
        <Limit />
      </div>
      <Pagination totalPages={totalPages} />
      <Suspense
        key={query + currentPage + orderBy + type + status + sort + limit}
        fallback={<div>Loading...</div>}
      >
        <AnimeList
          query={query}
          currentPage={currentPage}
          orderBy={orderBy}
          type={type}
          status={status}
          sort={sort}
          limit={limit}
        />
      </Suspense>
    </main>
  );
}
