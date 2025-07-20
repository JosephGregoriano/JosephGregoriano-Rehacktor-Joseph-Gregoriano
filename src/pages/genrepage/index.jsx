import React from 'react';
import { useParams } from 'react-router-dom';
import CardGame from '../../components/CardGame';
import useFetchSolution from '../../hooks/useFetchSolution';

const GenrePage = () => {
  const { genre } = useParams();
  const API_KEY = "452f540e70624ed1bcfa9c28010a4d36";
  const genreUrl = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&page=1`;

  const { data, loading, error } = useFetchSolution(genreUrl);

  return (
    <section className="min-h-screen px-6 py-10 bg-black bg-opacity-50">
      <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg uppercase">
        Genere: {genre}
      </h1>

      {loading && (
        <p className="text-center text-blue-400 font-medium animate-pulse mb-6">
          Caricamento in corso...
        </p>
      )}

      {error && (
        <div className="bg-red-600 bg-opacity-80 text-white p-4 rounded mb-6 text-center font-semibold">
          Errore: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.results?.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

export default GenrePage;