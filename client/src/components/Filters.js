import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from './ProductContext';
import { Container, Grid, Typography } from '@mui/material';
import Target from './Target';
import "./css/Filters.css"

function Filters() {

    const { productos } = useContext(productContext);
    const { searchTerm } = useParams();

    const [filters, setFilters] = useState({
        minPrice: 0,
        category: 'Frutas'
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = productos.filter(
            product => product.salePrice >= filters.minPrice &&
                (
                    filters.category === 'all' ||
                    product.categoryname === product.categoryname.includes(searchTerm)
                )
        );

        setFilteredProducts(filtered);
    }
        , [searchTerm, productos]);


    return (
        <><section className="filters">

            <div className="price">
                <Typography variant='button' htmlFor="price">Precio</Typography>
                <input
                    type="range"
                    id="price"
                    min="0"
                    max="100" />
            </div>

            <div className="category">
                <Typography variant='button' htmlFor="category">Categoria</Typography>
                <select id="category">
                    <option value="all">Todas</option>
                    <option value="Hortalizas">Hortalizas</option>
                    <option value="Frutas">Frutas</option>
                </select>
            </div>

        </section>

        <Container>
            <Grid container spacing={4}>
                <div className="body">
                    <Target products={filteredProducts} />
                </div>
            </Grid>
        </Container></>
    );

}

export default Filters