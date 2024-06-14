import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';
import Track from '../Track/Track';



    
        function SearchResults({input, onAddToPlaylist}) {
        
            const mustBe = input.toLowerCase();
        
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
                                        onAdd={() => onAddToPlaylist(track)}
                                         />
                                    
                                </div>
                                
                    
                            ))}
                            
                    
                    </div>
                    
                )
        };

export default SearchResults;