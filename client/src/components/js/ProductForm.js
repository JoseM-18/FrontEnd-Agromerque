import React, { useEffect, useState } from 'react';
import '../css/ProductFormat.css';
import TextField from '@mui/material/TextField';
import usePageTitle from './PageTitle';
import { Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {Alert } from '@mui/material';


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

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage("Por favor, llene todos los campos")
      setShowErrorMessage(true);
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
        setMessage("producto creado exitosamente")
        setShowSuccessMessage(true);
        //esperamos 3 segundos para redireccionar
        setTimeout(() => {
        window.location.href = '/'
        }, 3000);

      }
      if (date.message === 'Product already exists') {
        setMessage("El producto ya existe")
        setShowErrorMessage(true);
      }

      if (date.message === "Please. Send all data") {
        setMessage("Por favor, envie todos los datos")
        setShowErrorMessage(true);
      }
    } catch (error) {
      setMessage("Error al crear el producto")
      setShowErrorMessage(true);
    }



  };

  return (
    <div className="body">
      <h1 >Registro</h1>
      <form onSubmit={handleSubmit} className='form' >
        <div className='form__container'>

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

        </div>

        <Button type="submit" variant="contained" color="primary" className='boton'>
          Crear producto
        </Button>

        <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={() => setShowErrorMessage(false)}>
        <Alert severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={() => setShowSuccessMessage(false)}>
        <Alert severity="success">
          {message}
        </Alert>
      </Snackbar>

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
        {categories && categories.map((category) => (
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


export default ProductForm;
