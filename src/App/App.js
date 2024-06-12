import React, { useState } from 'react';
import './App.css';
import  SearchBar  from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App() {

  const [ input, setInput ] = useState('');

  const handleSearch = (query) => {setInput(query)};

  return (
    <div className="App">
      <h1>ja<span className='highlight'>mmm</span>ing</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults input={input} />
      <Playlist input={input} />
     
    </div>
  );
}

export default App;
