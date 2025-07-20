import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchSolution from '../../hooks/useFetchSolution';
import ToggleFavorite from './ToggleFavorite';
import Chatbox from '../../components/Chatbox';

export default function GamePage() {
    const { id } = useParams();
    
    const API_KEY = "452f540e70624ed1bcfa9c28010a4d36";
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return (
        <>
        {loading && <p>Caricamento dettagli del gioco...</p>}
        {error && <h1>{error}</h1>}
        {data && (
            <div className="game-detail-page">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1>{data.name}</h1>
            <ToggleFavorite data={data} />
            </div>
            {data.background_image && (
                <img src={data.background_image} alt={data.name} style={{ maxWidth: '100%', height: 'auto' }} />
            )}
            <div className="style-game-info mt-6 mb-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <p><strong>Rilasciato:</strong> {data.released}</p>
            <p><strong>Rating:</strong> {data.rating}</p>
            <p><strong>About:</strong> {data.description_raw}</p>
            </div>
            
            <div className="style-chatbox">
            <Chatbox data={data && data} />
            </div>
            </div>
        )}
        </>
    );
}