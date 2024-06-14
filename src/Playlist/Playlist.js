import React, { useState } from 'react';
import styles from './Playlist.module.css';

function Playlist ({ tracks, onNameChange, onSave }) {

    const [ playlistName, setPlaylistName ] = useState('');
    
    const handleNameChange = (e) =>
        {setPlaylistName(e.target.value);
            onNameChange(e.target.value);
        };

    return (
        <div className={styles.Playlist}>
        <input
            type="text" 
            value={playlistName} 
            onChange={handleNameChange} 
            placeholder="Enter Playlist Name" ></input>
        <div>
            {tracks.map((track, index) => (
                <div key={index} className={styles.track}>
                <h3>{track.title}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            ))}
        </div>


        <button className={styles.save} onClick={onSave}>Save to Spotify</button>
   
        </div>
                                    
                                       
    )
}

export default Playlist;