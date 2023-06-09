import React, { useState, useEffect, useContext } from 'react'
import {
  Card, CardContent, Table, TableContainer, Typography, Button, Badge, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  InputLabel, OutlinedInput, MenuItem
} from '@mui/material';
import Select from '@mui/material/Select';
import { productContext } from './ProductContext';
import '../css/ShoppingCart.css'
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';
import { IconButton } from '@mui/material';
import usePageTitle from './PageTitle';
import SeeInfo from './infoProduct';

const token = localStorage.getItem('token');

const storedProducts = localStorage.getItem('productsCart');

function Cart() {
  usePageTitle('Carrito de compras');
  const { productos } = useContext(productContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  //funcion para eliminar un producto del carrito de compras 
  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.idProduct !== id);
    setProducts(newProducts);
  };

  const removeQuantity = (idProduct, amount) => {
    const newProducts = products.map((product) => {
      if (product.idProduct === idProduct) {
        return { ...product, amount: product.amount - amount };
      }
      return product;
    });
    console.log(newProducts);
    setProducts(newProducts);
  };

  const fetchCartData = async () => {

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

  const [selectedProductId, setSelectedProductId] = useState(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const handleClickOpen = (idProduct) => {
    setSelectedProductId(idProduct);
    setIsInfoOpen(true);
    
  };

  const handleClose = () => {
    setSelectedProductId(null)
    setIsInfoOpen(false);
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
                    <h1 className='botones'>
                      <Button size='small' variant="outlined" color="primary" onClick={() => handleClickOpen(product.idProduct)} >Ver producto</Button>
                      <SeeInfo idProduct={selectedProductId} isOpen={isInfoOpen} onClose={handleClose} />
                      {product.idProduct && <DeleteQuantity idProduct={product.idProduct} amount={product.amount} products={products} removeProduct={removeProduct} removeQuantity={removeQuantity} />}
                    </h1>
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

function DeleteQuantity({ idProduct, amount, removeProduct, removeQuantity }) {
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

    try{

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
    if (data.message === 'product updated succesfully') {
      removeQuantity(productToElim.idProduct, productToElim.amount);
    }

    if (data.message === 'the product has been deleted') {
      removeProduct(productToElim.idProduct);

    }
    console.log(data);
    setOpen(false);
    handleClose();
    }catch(error){
      alert('Error al eliminar el producto')
    }
    
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