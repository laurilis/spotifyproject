import { useState } from 'react';
import styles from './SearchBar.module.css';


function SearchBar() {

    const [ input, setInput ] = useState('');



    const handleUserInput = (e) => {
        setInput(e.target.value)
    };

    return (
        <div className={styles.SearchBar}>
              <input 
                type="text" 
                value={input}
                onChange={handleUserInput} 
            />
            <button 
                className={styles.SearchButton} 
            >Search</button>
        </div>
    )

};

export default SearchBar;

