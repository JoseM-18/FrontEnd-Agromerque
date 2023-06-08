import Target from './Target'
import Filters from './Filters'
import productosData from '../data/products.json'
import './css/Body.css'

function Body() {

    const productos = productosData.productos;

    return(

        <div className = 'body'>
            <Filters />
            <Target products={ productos }/>
        </div>
        
    );
}

export default Body