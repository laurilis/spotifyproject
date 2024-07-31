import React, { useState, useEffect } from 'react';
import styles from './Playlist.module.css';

function Playlist ({ tracks, onNameChange, onSave, onRemove }) {

    const [ playlistName, setPlaylistName ] = useState('');
    
    useEffect(() => {
        setPlaylistName('');
    }, [tracks]);

    const handleNameChange = (e) =>
        {setPlaylistName(e.target.value);
            onNameChange(e.target.value);
        };
    
    const handleSave = () => {
            onSave(() => setPlaylistName('')); // Reset the playlist name after saving
        };

    return (
        <div className={styles.Playlist}>
        <input
            type="text" 
            value={playlistName} 
            onChange={handleNameChange} 
            placeholder="Invent Playlist Name" />
        <div className={styles.container}>
            {tracks.map((track, index) => (
                <div key={index} className={styles.track}>
                    <div>
                    <h3>{track.title}</h3>
                    <p>{track.artist} | {track.album}</p>  </div>
                <button onClick={() => onRemove(track)} className={styles.removeButton}>-</button>             
            </div>
           
            ))}
        </div>


        <button className={styles.save} onClick={onSave}>Save to Spotify</button>
   
        </div>
                                    
                                       
    )
}

export default Playlist;