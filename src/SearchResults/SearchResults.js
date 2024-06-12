import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';
import Track from '../Track/Track';



    
        function SearchResults({input}) {
        
            const mustBe = input.toLowerCase();
        
            const filteredTracks = mustBe.length >= 3 ? Tracklist.filter(track => 
                track.title.toLowerCase().includes(mustBe.toLowerCase()) || 
                track.artist.toLowerCase().includes(mustBe.toLowerCase()) || 
                track.album.toLowerCase().includes(mustBe.toLowerCase())
            ) : [];

           
                return (
                  <div className={styles.container}>
                    <div className={styles.SearchResults}>
                        <h2>Results</h2>
                        
                            {filteredTracks.map((track, index) => (
                               
                               <div key={index}   className={styles.fixButton}>
                                     <Track title={track.title} artist={track.artist} 
                                        album={track.album}
                                    
                                         />
                                    <button className={styles.addButton}>+</button>
                                </div>
                                
                    
                            ))}
                            
                    
                    </div>
                    </div>
                )
        };

export default SearchResults;