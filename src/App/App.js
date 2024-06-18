import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { initiateAuth, getToken } from '../Authorization';

function App() {
    const [input, setInput] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            getToken(code).then((token) => {
                if (token) {
                    setToken(token);
                    window.history.pushState({}, null, '/'); // Clean the URL
                }
            });
        } else {
            const storedToken = localStorage.getItem('access_token');
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    const handleSearch = (query) => {
        setInput(query);
    };

    const handleAddToPlaylist = (track) => {
        setPlaylistTracks(prevTracks => {
            if (!prevTracks.some(t => t.title === track.title)) {
                return [...prevTracks, track];
            }
            return prevTracks;
        });
    };

    const handleRemoveFromPlaylist = (track) => {
        setPlaylistTracks(playlistTracks.filter((t) => t.title !== track.title && t.artist !== track.artist));
    };

    const handleNameChange = (name) => {
        setPlaylistName(name);
    };

    const handleSavePlaylist = async () => {
        if (!token) {
            initiateAuth();
            return;
        }

        const userId = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => response.json()).then((data) => data.id);

        const playlist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'My new playlist',
                public: false,
            }),
        }).then((response) => response.json());

        const trackUris = playlistTracks.map((track) => track.uri);

        await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: trackUris }),
        });

        console.log('Playlist saved:', playlistName, playlistTracks);
    };

    return (
        <div className="App">
            <h1>ja<span className='highlight'>mmm</span>ing</h1>
            <SearchBar onSearch={handleSearch} />
            <div className='App-playlist'>
                <SearchResults input={input} onAddToPlaylist={handleAddToPlaylist} />
                <Playlist 
                    tracks={playlistTracks} 
                    onNameChange={handleNameChange} 
                    onSave={handleSavePlaylist}
                    onRemove={handleRemoveFromPlaylist} 
                />
            </div>
        </div>
    );
}

export default App;