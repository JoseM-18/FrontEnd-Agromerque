import Target from './Target'
import Filters from './Filters'
import '../css/Body.css'
import React, { useContext, useEffect, useState} from 'react';
import { productContext } from './ProductContext';
import usePageTitle from './PageTitle';

function Body() {
    
    usePageTitle('AgroMerque');
    const { productos } = useContext(productContext);

    return(

        <div className = 'body'>
            <Filters />
            {/*<Target products = {productos} />*/ }
        </div>
        
    );
}

export default Body