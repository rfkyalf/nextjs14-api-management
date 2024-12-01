import { getAllAnime } from '@/lib/actions';
import Image from 'next/image';

type AnimeProps = {
  mal_id: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  title: string;
};

export default async function AnimeList({
  query,
  currentPage,
  orderBy,
  type,
  status,
  sort,
  limit,
}: {
  query?: string;
  currentPage?: number;
  orderBy?: string;
  type?: string;
  status?: string;
  sort?: string;
  limit?: number;
}) {
  const animes = await getAllAnime(
    query,
    currentPage,
    orderBy,
    type,
    status,
    sort,
    limit
  );

  return (
    <>
      <div className="grid grid-cols-6 gap-4 pt-4">
        {animes?.data.map((anime: AnimeProps) => (
          <div key={anime.mal_id}>
            <Image
              src={anime.images.webp.image_url}
              alt={anime.title}
              width={500}
              height={500}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <h3>
              {anime.title.length > 15
                ? `${anime.title.slice(0, 15)}...`
                : anime.title}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
