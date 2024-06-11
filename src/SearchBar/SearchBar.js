import { useState } from 'react';
import styles from './SearchBar.module.css';



function SearchBar(props) { 

    const [ currentInput, setCurrentInput ] = useState('');

    const handleInputChange = (e) => {
        setCurrentInput(props.onSearch(e.target.value))
    };

    return (
        <div className={styles.SearchBar}>
              <input 
                type="text" 
                value={props.input}
                onChange={handleInputChange} 
            />
            <button 
                className={styles.SearchButton} 
                onClick={() => props.onSearch(currentInput)} 
            >Search</button>
        </div>
    )

};

export default SearchBar;

