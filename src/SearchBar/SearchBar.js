import { useState } from 'react';
import './SearchBar.module.css';


function SearchBar() {

    const [ input, setInput ] = useState('');



    const handleInputChange = (e) => {
        setInput(e.target.value)
    };

    return (
        <div className='SearchBar'>
              <input 
                
                type="text" 
                value={input}
                onChange={handleInputChange} 
            />
            <button 
                className="SearchButton" 
            >Search</button>
        </div>
    )

};

export default SearchBar;