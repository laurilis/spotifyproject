import Tracklist from '../Tracklist/Tracklist';

function SearchResults (props) {

    
        function SearchResults(props) {
        
        
            const filteredTracks = Tracklist.filter(track => 
                track.title.toLowerCase().includes(props.input.toLowerCase()) || 
                track.artist.toLowerCase().includes(props.input.toLowerCase()) || 
                track.album.toLowerCase().includes(props.input.toLowerCase())
            );
        
            return (
                <div className="SearchResults">
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


        }};

        export default SearchResults;