import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../../context/FavoritesContext";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((el) => +el.game_id === data?.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(data.id);
    } else {
      addFavorites(data);
    }
  };

  return (
    <button onClick={handleToggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#e74c3c' }}>
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}