import { useState } from 'react';
import styles from './SearchBar.module.css';



function SearchBar({ onSearch, authenticate }) { 

    const [ currentInput, setCurrentInput ] = useState('');

    const handleInputChange = (e) => {
        const name = e.target.value;
        setCurrentInput(name);
        onSearch(name);
    };

    return (
        <div className={styles.SearchBar}>
              <input  
                type="text" 
                value={currentInput}
                onChange={handleInputChange} 
                placeholder="Search for song, artist or album"
            />
            <button 
                className={styles.SearchButton} 
                onClick={authenticate} //vorher props.onSearch(currentInput) 
            >Login to Spotify</button>
        
        </div>
    )

};

export default SearchBar;

