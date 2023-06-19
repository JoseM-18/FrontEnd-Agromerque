import React, { useState, useEffect, useContext } from 'react'
import {
  Card, CardContent, Table, TableContainer, Typography, Button, Badge, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  InputLabel, OutlinedInput, MenuItem
} from '@mui/material';
import Select from '@mui/material/Select';
import { productContext } from './ProductContext';
import './css/ShoppingCart.css'
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';
import { IconButton } from '@mui/material';

const token = localStorage.getItem('token');
const storedProducts = localStorage.getItem('productsCart');

function Cart() {
  const { productos } = useContext(productContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.idProduct !== id);
    setProducts(newProducts);
  };

  const fetchCartData = async () => {
    // Obtener la información del carrito desde el almacenamiento local

      try {

        // Si no se encuentran productos almacenados, obtener los datos desde la base de datos
        const response = await fetch('http://localhost:4000/shoppingCart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        const data = await response.json();
        const productsWithAmount = data.products.map((product) => {
          const ids = product.idProduct;
          const productInfo = productos.find((p) => p.idProduct === ids);
          return { ...productInfo, amount: product.amount };
        }

        );
        setProducts(productsWithAmount);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }

  };


  useEffect(() => {
    fetchCartData();
  }, []);

  const getStockColor = (stock) => {
    if (stock > 10) {
      return 'green';
    } else if (stock > 0) {
      return 'orange';
    } else {
      return 'red';
    }

  };

  return (
    <div className="body">
      {isLoading ? (
        <div className='cargando'>
          <CircularProgress />
        </div>
      ) : (
        <div className='content'>

          <Typography variant="h6">Carrito de compras</Typography>
          {products ? (
            <TableContainer component={Card}>
              <Table className='infoProduct'>
                {products.map((product) => (

                  <CardContent key={product.idProduct}>
                    <Typography>Producto: {product.name}</Typography>
                    <Typography>Precio unitario:  {product.salePrice}</Typography>
                    <span style={{ color: getStockColor(product.stock) }}>
                      {product.stock <= 10 ? 'Cantidad en stock: ' + product.stock : 'Disponible'}
                    </span>
                    <Typography>Cantidad: {product.amount}</Typography>
                    <div className='botones'>
                      <Button size='small' variant="outlined" color="primary" >Ver producto</Button>
                      {product.idProduct && <DeleteQuantity idProduct={product.idProduct} amount={product.amount} products= {products} removeProduct={removeProduct} />}
                    </div>
                  </CardContent>
                ))}
              </Table>
            </TableContainer>

          ) : (
            <Typography>No hay productos en el carrito</Typography>
          )}
          <Button variant="contained" color="primary" disabled={products.length === 0} onClick={() => navigate('/checkout')}>Finalizar compra</Button>

          <Badge badgeContent={0} color="secondary">
            {/* Contenido con contador del carrito */}
          </Badge>
        </div>

      )}
    </div>
  );
}

function DeleteQuantity({ idProduct, amount,products, removeProduct }) {
  const [open, setOpen] = useState(false);
  const [productToElim, setProductToElim] = useState({ idProduct: idProduct, amount: 1 });

  const handleChange = (event) => {
    setProductToElim({
      ...productToElim,
      amount: event.target.value
    });
  };



  const handleClose = (event, reason) => {

    if (reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {

    const resul = await fetch('http://localhost:4000/shoppingCart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        idProduct: productToElim.idProduct,
        amount: productToElim.amount
      })
    });
    const data = await resul.json();
    if (data === 'the product has been updated') {
      const newProducts = products.map((product) => {
        if (product.idProduct === productToElim.idProduct) {
          return { ...product, amount: product.amount - productToElim.amount };
        } else {
          return product;
        }

      });
      localStorage.setItem('productsCart', JSON.stringify(newProducts));

    }

    if(data === 'the product has been deleted'){
      removeProduct(productToElim.idProduct);
    }

    setOpen(false);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleOpen}>
        Eliminar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Eliminar producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Cuántos productos desea eliminar?
          </DialogContentText>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-dialog-select-label">Cantidad</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={productToElim.amount}
              onChange={handleChange}
              input={<OutlinedInput label="Cantidad" />}

            >
              {Array.from({ length: amount }, (_, i) => i + 1).map((amount) => (
                <MenuItem key={amount} value={amount}>
                  {amount}
                </MenuItem>
              ))}


            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <IconButton onClick={handleDelete} > Eliminar </IconButton>
        </DialogActions>
      </Dialog>

    </div>

  )

}


export default Cart;