import { useState, useEffect, useContext } from 'react';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import FavoritesContext from '../../context/FavoritesContext';
import Avatar from '../../components/Avatar';
import { FaTrashAlt } from "react-icons/fa";

const favoriteGameUI = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  border: "1px solid #eee",
  padding: "10px",
  borderRadius: "5px",
};

export default function AccountPage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn('Errore nel recupero profilo:', error.message);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
        setLoading(false);
      }
    };

    if (session) {
      getProfile();
    }
    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      alert('Errore aggiornamento:', error.message);
    } else {
      alert('Profilo aggiornato con successo!');
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="container py-5">
        <h3>Sessione non disponibile. Effettua il login.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2>Impostazioni Profilo</h2>
      <form onSubmit={updateProfile} className="form-widget">
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(event, url) => {
            setAvatarUrl(url);
            updateProfile(event);
          }}
        />
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Nome Utente</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="first_name">Nome</label>
          <input
            id="first_name"
            type="text"
            value={first_name || ''}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last_name">Cognome</label>
          <input
            id="last_name"
            type="text"
            value={last_name || ''}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mt-5 bg-warning bg-opacity-75 rounded-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <button className="button primary block" type="submit" disabled={loading}>
            {loading ? 'Caricamento...' : 'Aggiorna Profilo'}
          </button>
        </div>
      </form>

      <div className="mt-5">
        <h3>Favoriti</h3>
        {favorites.length === 0 ? (
          <p>Non ci sono favoriti al momento...</p>
        ) : (
          <div>
            {favorites.map((game) => {
              return (
                <div key={game.id} style={favoriteGameUI}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img width={50} height={50} src={game.game_image} alt={game.game_name} style={{ marginRight: "10px" }} />
                    <span>{game.game_name}</span>
                  </div>
                  <button onClick={() => removeFavorite(game.game_id)} className="button secondary">
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}