import React, { useContext, useEffect, useState } from 'react';
import { productContext } from './ProductContext';
import { Container, Grid, Typography } from '@mui/material';
import Target from './Target';
import "../css/Filters.css"

function Filters() {

    const { productos } = useContext(productContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/category');
                const data = await response.json();
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, [])



    const [filters, setFilters] = useState({
        minPrice: 0,
        category: 'all'
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = productos.filter(
          (product) =>
            product.salePrice >= filters.minPrice &&
            (filters.category === 'all' || product.categoryname === filters.category)
        );
      
        setFilteredProducts(filtered);
      }, [productos, filters.minPrice, filters.category]);
      

    const [minPrice, setMinPrice] = useState(0)

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);

        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <><section className="filters">

            <div className="price">
                <Typography variant='button' htmlFor="price">Precio Mínimo</Typography>
                <input
                    type="range"
                    id="price"
                    min='0'
                    max='10000' 
                    onChange={handleMinPriceChange}/>
                <span> {minPrice} </span>
            </div>

            <div className="category">
                <Typography variant='button' htmlFor="category">Categoria</Typography>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    {categories && categories.map((category) => (
                        <option key={category.idCategory} value={category.nameCategory}>{category.nameCategory}</option>
                    ))}
                </select>
                    
            </div>

        </section>

        <Container>
            <Grid container spacing={4}>
                <div className="body" >
                    <Target products={filteredProducts} />
                </div>
            </Grid>
        </Container></>
    );

}

export default Filters