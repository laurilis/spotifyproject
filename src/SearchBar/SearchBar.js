import { useState } from 'react';
import styles from './SearchBar.module.css';



function SearchBar(props) { 

    const [ currentInput, setCurrentInput ] = useState('');

    const handleInputChange = (e) => {
        const name = e.target.value;
        setCurrentInput(name);
        props.onSearch(currentInput);
    };

    return (
        <div className={styles.SearchBar}>
              <input  
                type="text" 
                value={currentInput}
                onChange={handleInputChange} 
            />
            <button 
                className={styles.SearchButton} 
                onClick={() => props.onSearch(currentInput)} 
            >SearchySearch</button>
        </div>
    )

};

export default SearchBar;

