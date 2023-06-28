import React, { useEffect, useState } from 'react';
import './css/ProductFormat.css';
import TextField from '@mui/material/TextField';
import usePageTitle from './PageTitle';
import { Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import {Modal} from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';



function ProductForm() {
  usePageTitle('Registro de productos');
  const [product, setProduct] = useState({
    idProduct: 0,
    name: '',
    description: '',
    purchasePrice: 0,
    image: '',
    salePrice: 0,
    stock: 0,
    color: '',
    size: '',
    weight: 0,
    category: 0,
    harvestDate: '',
  });


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  
  const handleCategoryChange = (value) => {
    setProduct({
      ...product,
      category: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const empyField = Object.values(product).some((value) => value === "")

    if (empyField) {
      alert("Por favor, llene todos los campos")
      return
    }

    try {
      const token = localStorage.getItem('token')
      // Lógica para manejar el envío del formulario de registro
      const res = await fetch('http://localhost:4000/product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })

      const date = await res.json()

      if (date.message === 'Product created successfully') {
        alert(date.message)
        window.location.href = '/'
      }
      if (date.message === 'Product already exists') {
        alert(date.message)
      }

      if (date.message === "Please. Send all data") {
        alert(date.message)
      }
    } catch (error) {
      console.log(error)
    }



  };

  return (
    <div className="register">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} >

        <TextField
          label="id del Producto"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='idProduct'
          onChange={handleChange}
        />

        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='name'
          onChange={handleChange}

        />

        <TextField
          label="Descripcion"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='description'
          onChange={handleChange}

        />

        <TextField
          label="Precio de compra"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='purchasePrice'
          onChange={handleChange}
        />

        <TextField
          label="link de la imagen"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='image'
          onChange={handleChange}

        />

        <TextField
          label="Precio de venta"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='salePrice'
          onChange={handleChange}
        />

        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='stock'
          onChange={handleChange}
        />

        <TextField
          label="Color"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='color'
          onChange={handleChange}
        />

        <TextField
          label="Tamaño"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='size'
          onChange={handleChange}
        />

        <TextField
          label="Peso (Kg.)"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='weight'
          onChange={handleChange}
        />

        <Categories
          onCategoryChange={handleCategoryChange}
          label="Categoria"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='category'
        />


        <TextField
          label="Fecha de cosecha"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          type='date'
          style={textFieldStyle}
          name='harvestDate'
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" color="primary">
          Crear producto
        </Button>

        <Snackbar
          open={open}
          onClose={handleClose}
          message="Usuario creado exitosamente"
          autoHideDuration={3000}
        />

      </form>
    </div>
  );
}

function Categories({ onCategoryChange, label, variant, fullWidth, margin, style, name }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('http://localhost:4000/Category');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <FormControl fullWidth margin="normal" variant={variant} style={style}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        onChange={(event) => {
          onCategoryChange(event.target.value);
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category.idCategory} value={category.idCategory}>
            {category.nameCategory}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const textFieldStyle = {
  width: '50%',
  margin: '10px 3px',
};

function options (){

  
}

export default ProductForm;
