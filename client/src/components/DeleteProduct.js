import React from "react";
import {useState} from 'react';
import { productContext } from "./ProductContext";
import usePageTitle from './PageTitle';
import { useContext } from "react";
import { Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import {TextField} from '@mui/material';

function DeleteProduct() {
  usePageTitle('Eliminar producto');
  const [idProduct, setIdProduct] = useState(0);
  const token = localStorage.getItem('token');
  const { productos } = useContext(productContext);
  const [open , setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setIdProduct(parseInt(event.target.value));
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const empyField = Object.values(idProduct).some((value) => value === "")

    if (empyField) {
      alert("Por favor, llene todos los campos")
      return
    }
      
      //buscamos entre los productos el que tenga el id que queremos eliminar y le preguntamos al usuario si esta seguro de eliminarlo mostrandole el nombre del producto
      const product = productos.find((product) => product.idProduct === idProduct)
      if(!product) return alert('No existe un producto con ese id');
      const confirm = window.confirm(`¿Está seguro que desea eliminar el/los producto/s ${product.name}?`)
      if (confirm) {
      const resul = await fetch(`http://localhost:4000/product/${idProduct}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      });

    const data = await resul.json();
    console.log(data);
    setOpen(true);

    if(data.message === 'Product deleted successfully'){
      alert('Producto eliminado');
    }
    if(data.message === 'Producto no encontrado'){
      alert('Producto no encontrado');
    }
    if(data.message === 'No se pudo eliminar el producto'){
      alert('No se pudo eliminar el producto');
    }

  } 


}

  return (
    <div className="body">
      <h1>Eliminar producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Id del producto"
            variant="outlined"
            fullWidth
            margin="normal"
            name='idProduct'
            onChange={handleChange}
          />
        </div>
        <Button variant="contained" type="submit" color="primary" fullWidth>
          Eliminar
        </Button>
        <Snackbar
          open={open}
          onClose={handleClose}
          message="Producto eliminado"
          autoHideDuration={3000}
        />

      </form>
    </div>
  );
}

export default DeleteProduct;