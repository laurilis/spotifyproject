import React, { useState } from 'react';
import './App.css';
import  SearchBar  from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App() {

  const [ input, setInput ] = useState('');
  const [ playlistTracks, setPlaylistTracks ] = useState([]);
  const [ playlistName, setPlaylistName ] = useState('');

  const handleSearch = (query) => {setInput(query)};

  const handleAddToPlaylist = (track) => {
    setPlaylistTracks(prevTracks => {
        if (!prevTracks.some(t => t.title === track.title)) {
            return [...prevTracks, track];
        }
        return prevTracks;
    });
};

const handleNameChange = (name) => {
    setPlaylistName(name);
};

const handleSavePlaylist = () => {
  console.log("Playlist saved:", playlistName, playlistTracks);
};

  return (
    <div className="App">
      <h1>ja<span className='highlight'>mmm</span>ing</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults input={input} onAddToPlaylist={handleAddToPlaylist}/>
      <Playlist 
        tracks={playlistTracks} 
        onNameChange={handleNameChange} 
        onSave={handleSavePlaylist}  />
     
    </div>
  );
}

export default App;
