import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';
import styles from './SearchResults.module.css';

function SearchResults({ input, onAddToPlaylist, token }) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (input.length < 3) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            if (!token) return;

            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(input)}&type=track`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                if (data.tracks && data.tracks.items) {
                    setResults(data.tracks.items);
                } else {
                    throw new Error('Tracks data is undefined');
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError(error.message);
            }
        };

        fetchResults();
    }, [input, token]);

    const handleAddTrack = (track) => {
        const trackToAdd = {
            id: track.id,
            uri: track.uri,
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
        };
        onAddToPlaylist(trackToAdd);
    };

    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            {error && <p className={styles.error}>Error: {error}</p>}
            <div className={styles.container}>
                {results.map((track, index) => {
                    console.log('Track object:', track); // Log the entire track object
                    return (
                        <div key={index} className={styles.track}>
                            <Track  
                                title={track.name} 
                                artist={track.artists[0].name} 
                                album={track.album.name}
                                onAdd={() => handleAddTrack(track)} 
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchResults;
