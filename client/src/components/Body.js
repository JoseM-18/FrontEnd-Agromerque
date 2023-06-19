import Target from './Target'
import Filters from './Filters'
import './css/Body.css'
import React, { useContext } from 'react';
import { productContext } from './ProductContext';

function Body() {

    const { productos } = useContext(productContext);
    
    return(

        <div className = 'body'>
            <Filters />
            <Target products = {productos} />
        </div>
        
    );
}

export default Body