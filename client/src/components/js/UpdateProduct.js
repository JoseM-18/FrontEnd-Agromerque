import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import {Modal} from '@mui/material';
import { productContext } from './ProductContext';
import usePageTitle from './PageTitle';
import { useContext } from 'react';
import '../css/UpdateProduct.css'
import { useNavigate } from 'react-router-dom';
import {Snackbar } from '@mui/material';

function UpdateProduct() {
  usePageTitle('Actualizar producto');
  const [idProduct, setIdProduct] = useState(0);
  const token = localStorage.getItem('token');
  const { productos } = useContext(productContext);
  const [open , setOpen] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setIdProduct(parseInt(event.target.value));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emptyField = Object.values(idProduct).some((value) => value === "")

    if (emptyField) {
      alert("Por favor, llene todos los campos")
      return
    }
      
    const product = productos.find((product) => product.idProduct === idProduct)
    if(!product) return alert('No existe un producto con ese id');
  
    setProductData(product);
    
  }
  const handleUpdate = async (event) => {
    event.preventDefault();
    // Realiza la lógica para actualizar el producto con los datos enviados
    const preventMessage = window.confirm('¿Está seguro de que desea actualizar este producto?');
    if(!preventMessage) return; 
    
    try{
    const res = await fetch(`http://localhost:4000/product/${idProduct}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(productData)
    });
    const data = await res.json();

    if(data.message === 'Product updated successfully'){
      setOpen(true);
      
    }
    if(data.message === 'Producto no encontrado'){
      alert('Producto no encontrado');
    }
    

    // Cierra el modal dando 3 segundos para que el usuario pueda leer el mensaje
    
  }catch(error){
    console.log(error);
  }
  
  };


  return (
    <div className='body' >
      <form onSubmit={handleSubmit} style={{marginTop:'20%'}}>
        <TextField
          id="outlined-basic"
          label="Id del producto"
          variant="outlined"
          fullWidth
          margin="normal"
          name='idProduct'
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">Buscar</Button>
      </form>

      {productData && (
        <div>
          <h2>Actualizar producto</h2>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Nombre"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <TextField
              label="Precio"
              type="number"
              InputLabelProps = {{shrink: true}}
              value={productData.salePrice}
              onChange={(e) => setProductData({ ...productData, salePrice: e.target.value })}
            />
            {/* Agrega más campos para los otros atributos del producto */}
            <TextField
              label="Stock"
              type="number"
              InputLabelProps = {{shrink: true}}
              value={productData.stock}
              onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
            />
            <TextField
              label="Descripción"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
            <TextField
              label="Imagen"
              value={productData.image}
              onChange={(e) => setProductData({ ...productData, image: e.target.value })}
            />
            <TextField
              label="Peso"
              type="number"
              InputLabelProps = {{shrink: true}}
              value={productData.weight}
              onChange={(e) => setProductData({ ...productData, weight: e.target.value })}
            />
            <TextField
              label="purchasePrice"
              type="number"
              InputLabelProps = {{shrink: true}}
              value={productData.purchasePrice}
              onChange={(e) => setProductData({ ...productData, purchasePrice: e.target.value })}
            />

            <TextField
              label="harvestDate"
              type="date"
              InputLabelProps = {{shrink: true}}
              value={productData.harvestDate}
              onChange={(e) => setProductData({ ...productData, harvestDate: e.target.value })}
            />
            
            <Button variant="contained" color="primary" type="submit">Guardar cambios</Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message="Producto actualizado"
            />

          </form>
        </div>
      )}

      
    </div>
  );
}

export default UpdateProduct;
