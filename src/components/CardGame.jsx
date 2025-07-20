// vedi  il perc.corretto
import { Link } from 'react-router-dom';
import LazyLoadGameImage from './LazyLoadGameImage';

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(', ');
  const { background_image: image } = game;
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full p-4">
    <LazyLoadGameImage image={image} className="w-full h-48 object-cover mb-4 rounded-md" />
    <h2 className="text-xl font-bold mb-2">{game.name}</h2>
    <p className="text-sm text-gray-600 mb-1">{genres}</p>
    <p className="text-sm text-gray-500 mb-3">Uscita: {game.released}</p>
   
<a
  class="mt-auto inline-block text-white py-2 px-4 rounded bg-black bg-opacity-50"
  href="/games/satisfactory/58806"
>
  Visita il gioco
</a>

    </article>
  );
}