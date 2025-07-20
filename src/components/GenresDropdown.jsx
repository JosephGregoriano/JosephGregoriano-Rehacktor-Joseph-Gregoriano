import React from "react";
import { Link } from "react-router-dom";
import useFetchSolution from '../hooks/useFetchSolution';

export default function GenresDropdown() {
  const API_KEY = "452f540e70624ed1bcfa9c28010a4d36";
  const initialUrl = `https://api.rawg.io/api/genres?key=${API_KEY}`;

  const { data: genres, loading, error } = useFetchSolution(initialUrl);

  return (
    <details className="dropdown">
      <summary>Genres</summary>
      {loading && <p>Caricamento generi...</p>}
      {error && <small>{error}</small>}
      {genres && genres.results && (
        <ul>
          {genres.results.map((genre) => (
            <li key={genre.id}>
              <Link
                to={`/games/${genre.slug}`}
                className="text-white font-medium tracking-wide"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}