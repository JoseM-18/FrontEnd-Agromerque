import React,{  useState, useEffect,useContext,createContext } from 'react'
import style from './css/cart.css';
import { Card, CardContent, Table, TableContainer, Typography, Button, Badge } from '@mui/material';
import { productContext } from './ProductContext';

function Cart(){

  const  { productos } = useContext(productContext);

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('token')
  const haveCart =  async () => {
    const response = await fetch('http://localhost:4000/shoppingCart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    const data = await response.json()
    if(data.message === "Cart doesn't found"){
      const create = await fetch('http://localhost:4000/shoppingCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      const data = await create.json()
      setCart(data)
      //console.log(data)

    }else{
      const ids = data.products.map(product => product.idProduct)
      const products = productos.filter(product => ids.includes(product.idProduct))  
      setProducts(products)  
      
    }

  }

  useEffect(() => {
    haveCart();
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente

  
 
  //funcion 

  return (
    <div className='content'>

      <Typography variant="h6">Carrito de compras</Typography>
      {products.length > 0 ? (
        <TableContainer component={Card}>
          <Table>
            {products.map((product) => (
              <CardContent key={product.idProduct}>
                <Typography>{product.name}</Typography>
                <Typography>{product.salePrice}</Typography>
              </CardContent>
            ))}
          </Table>
        </TableContainer>

      ) : (
        <Typography>No hay productos en el carrito</Typography>
      )}

      <Button variant="contained" color="primary">Finalizar compra</Button>

      <Badge badgeContent={0} color="secondary">
        {/* Contenido con contador del carrito */}
      </Badge>
    </div>
  );
}

export default Cart;