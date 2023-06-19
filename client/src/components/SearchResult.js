// creacion de componente SearchResult

import React, { useContext, useEffect, useState } from 'react';
import { productContext } from './ProductContext';
import { useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Target from './Target';
import usePageTitle from './PageTitle';
function SearchResult() {

  const { productos } = useContext(productContext);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchTerm } = useParams();

  usePageTitle('Busqueda ' + searchTerm);
  useEffect(() => {
    const filtered = productos.filter(producto => producto.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(filtered);
  }
    , [searchTerm, productos]);

  return (
    <Container >
      <Grid container spacing={4}>
        <div className= "body">
        <Target products={filteredProducts} />
        </div>
      </Grid>
    </Container>
  );

}

export default SearchResult;