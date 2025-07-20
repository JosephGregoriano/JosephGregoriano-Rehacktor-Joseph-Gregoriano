import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CardGame from '../../components/CardGame';
import useFetchSolution from '../../hooks/useFetchSolution';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');

  const API_KEY = "452f540e70624ed1bcfa9c28010a4d36";
  const initialUrl = searchTerm ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchTerm}` : null;

  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <>
      <h1>Risultati di ricerca per: "{searchTerm}"</h1>
      <div className="grid-games-list">
        {loading && <p>Caricamento risultati...</p>}
        {error && <article>{error}</article>}
        {data && data.results && data.results.length > 0 ? (
          data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))
        ) : (
          !loading && !error && <p>Nessun risultato trovato per "{searchTerm}".</p>
        )}
      </div>
    </>
  );
}