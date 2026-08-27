import { MovieDetailsPage } from "@/widgets/movie-details";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <MovieDetailsPage id={Number(id)} />
    </>
  );
}
