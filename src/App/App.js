
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { authenticate, getToken } from '../Authorization';

function App() {
    const [input, setInput] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const handleAuthentication = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const accessToken = await getToken(code);
                    setToken(accessToken);
                    localStorage.setItem('access_token', accessToken); // Save token to localStorage
                    window.history.replaceState({}, document.title, "/"); // Clear the code from URL
                } catch (error) {
                    console.error("Authentication Error:", error);
                }
            } else {
                const storedToken = localStorage.getItem('access_token');
                if (storedToken) {
                    setToken(storedToken);
                }
            }
        };

        handleAuthentication();
    }, []);

    const handleSearch = (query) => {
        setInput(query);
    };

    const handleAddToPlaylist = (track) => {
        setPlaylistTracks(prevTracks => {
            if (!prevTracks.some(t => t.id === track.id)) {
                return [...prevTracks, track];
            }
            return prevTracks;
        });
    };

    const handleRemoveFromPlaylist = (track) => {
        setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
    };

    const handleNameChange = (name) => {
        setPlaylistName(name);
    };

    const handleSavePlaylist = async () => {
        if (!token) {
            authenticate();
            return;
        }
    
        try {
            // Fetch user ID
            const userResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!userResponse.ok) {
                throw new Error(`Failed to fetch user info: ${userResponse.statusText}`);
            }
            const userData = await userResponse.json();
            const userId = userData.id;
    
            // Create a new playlist
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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
            });
            if (!playlistResponse.ok) {
                const errorData = await playlistResponse.json();
                throw new Error(`Failed to create playlist: ${playlistResponse.statusText} - ${errorData.error.message}`);
            }
            const playlistData = await playlistResponse.json();
            const playlistId = playlistData.id;
    
            // Validate playlist data
            if (!playlistId) {
                throw new Error('Playlist ID is missing from the response');
            }
    
            // Add tracks to the playlist
            const trackUris = playlistTracks.map(track => track.uri);
            const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uris: trackUris }),
            });
            if (!tracksResponse.ok) {
                const errorData = await tracksResponse.json();
                throw new Error(`Failed to add tracks to playlist: ${tracksResponse.statusText} - ${errorData.error.message}`);
            }

              // Clear the playlist name and tracks after saving
              setPlaylistName('');
              setPlaylistTracks([]);
    
            console.log('Playlist saved successfully:', playlistName, playlistTracks);
        } catch (error) {
            console.error('Error saving playlist:', error);
        };

        alert('Playlist successfully saved!');

    };
    
  
    return (
        <div className="App">
            <h1>ja<span className='highlight'>mmm</span>ing</h1>
            <SearchBar onSearch={handleSearch} authenticate={authenticate}/>
            <div className='App-playlist'>
                <SearchResults input={input} onAddToPlaylist={handleAddToPlaylist} token={token} />
                <Playlist 
                    tracks={playlistTracks} 
                    onNameChange={handleNameChange} 
                    onSave={() => handleSavePlaylist(() => setPlaylistName(''))}
                    onRemove={handleRemoveFromPlaylist} 
                />
            </div>
        </div>
    );
}

export default App;



/*
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { authenticate, getToken, getRefreshToken } from '../Authorization';

function App() {
    const [input, setInput] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [token, setToken] = useState('');

    

    useEffect(() => {
        const handleAuthentication = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const accessToken = await getToken(code);
                    setToken(accessToken);
                    window.history.replaceState({}, document.title, "/"); // Clear the code from URL
                } catch (error) {
                    console.error("Authentication Error:", error);
                }
            } else {
                const storedToken = localStorage.getItem('access_token');
                if (storedToken) {
                    setToken(storedToken);
                }
            }
        };

        handleAuthentication();
    }, []);


    const handleSearch = (query) => {
        setInput(query);
    };

    const handleAddToPlaylist = (track) => {
        setPlaylistTracks(prevTracks => {
            if (!prevTracks.some(t => t.uri === track.uri)) {
                return [...prevTracks, track];
            }
            return prevTracks;
        });
    };

    const handleRemoveFromPlaylist = (track) => {
        setPlaylistTracks(playlistTracks.filter((t) => t.uri !== track.uri));
    };

    const handleNameChange = (name) => {
        setPlaylistName(name);
    };

    const handleSavePlaylist = async () => {
        if (!token) {
            authenticate();
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
            <SearchBar onSearch={handleSearch} authenticate={authenticate}/>
            <div className='App-playlist'>
                <SearchResults input={input} onAddToPlaylist={handleAddToPlaylist} token={token} />
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
*/
