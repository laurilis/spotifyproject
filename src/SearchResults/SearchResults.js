import React, { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';
import Track from '../Track/Track';



    
        function SearchResults({input, onAddToPlaylist}) {

            const [ results, setResults ] = useState([]);

            useEffect(() => {
                if (input.length < 3) {
                    setResults([]);
                    return;
                }

            const fetchResults = async () => {
                const token = localStorage.getItem('spotify_access_token'); // assuming the token is stored in localStorage
                if (!token) return;
    
                const response = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setResults(data.tracks.items);
            };
    
            fetchResults();
        }, [input]);

        return (
            <div className={styles.SearchResults}>
                <h2>Results</h2>
                <div className={styles.container}>
                    {results.map((track, index) => (
                        <div key={index} className={styles.track}>
                            <Track title={track.name} artist={track.artists[0].name} album={track.album.name} />
                            <button onClick={() => onAddToPlaylist(track)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
                );
        
            /* const mustBe = input.toLowerCase();
        
            const filteredTracks = mustBe.length >= 3 ? Tracklist.filter(track => 
                track.title.toLowerCase().includes(mustBe.toLowerCase()) || 
                track.artist.toLowerCase().includes(mustBe.toLowerCase()) || 
                track.album.toLowerCase().includes(mustBe.toLowerCase())
            ) : [];

            const handleClick = () => {}; 
           
                return (
                  
                    <div className={styles.SearchResults}>
                        <h2>Results</h2>
                        
                            {filteredTracks.map((track, index) => (
                               
                               <div key={index} >
                                     <Track 
                                        title={track.title} 
                                        artist={track.artist} 
                                        album={track.album}
                                        id={track.id}
                                        onAdd={() => onAddToPlaylist(track)}
                                         />
                                    
                                </div>
                                
                    
                            ))}
                            
                    
                    </div>
                    
                ) */

          
        };

export default SearchResults;