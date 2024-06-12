import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';



    
        function SearchResults(props) {
        
        
            const filteredTracks = Tracklist.filter(track => 
                track.title.toLowerCase().includes(props.input.toLowerCase()) || 
                track.artist.toLowerCase().includes(props.input.toLowerCase()) || 
                track.album.toLowerCase().includes(props.input.toLowerCase())
            );

            if(props.input === '') 

           
                return (
                    <div className={styles.SearchResults}>
                        <ul>
                            {filteredTracks.map((track, index) => (
                                <li key={index}>
                                    <h3>{track.title}</h3>
                                    <p>{track.artist}</p>
                                    <p>{track.album}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            

        
        
            


        };

        export default SearchResults;