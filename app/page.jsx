import Movie from "@/models/Movie";
import connectDB from "@/libs/database";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  async function getMovies() {
    try {
      await connectDB();
      const res = await Movie.find();
      const movies = JSON.parse(JSON.stringify(res));
      return movies;
    } catch (error) {}
  }
  const movies = await getMovies();
  return (
    <div className="grow">
      <div className="container mx-auto p-4">
        <div className="pt-0 md:pt-8">
          <h1 className="text-4xl font-bold  mb-2">Movies</h1>
          <p className="text-gray-700">Discover and rate your favorite films</p>
        </div>
        <div className="grid py-4 md:py-8 gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies &&
            movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
        </div>
        {!movies && (
          <p className="text-center text-2xl mt-20">Error getting movies</p>
        )}
      </div>
    </div>
  );
}
