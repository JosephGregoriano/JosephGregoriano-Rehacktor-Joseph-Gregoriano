import React from 'react';
import CardGame from "../../components/CardGame";
import useFetchSolution from '../../hooks/useFetchSolution';

const HomePage = () => {
  const API_KEY = "452f540e70624ed1bcfa9c28010a4d36";
  const initialUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=1`;

  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <section className="min-h-screen px-6 py-10 bg-white bg-opacity-10 backdrop-blur-md rounded-lg text-white">
      <h1 className="text-3xl font-bold mb-8 text-center drop-shadow-lg uppercase">
        Home Page
      </h1>

      {loading && (
        <p className="text-center text-yellow-300 font-medium animate-pulse mb-6">
          Caricamento dati...
        </p>
      )}

      {error && (
        <div className="bg-red-600 bg-opacity-70 p-4 rounded mb-6 text-center font-semibold">
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

export default HomePage;