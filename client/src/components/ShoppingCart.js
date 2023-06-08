import { React, useState, useEffect } from 'react'
import style from './css/cart.css';
import { Card, CardContent, Table, TableContainer, Typography, Button, Badge } from '@mui/material';
import { useNavigate } from 'react-router'


function Cart() {

  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:4000/shoppingCartProduct/:', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    }
    }

  )};
  //funcion 

  return (
    <div className='content'>
      <Typography variant="h6">Carrito de compras</Typography>

      <Card>
        <CardContent>
          { /* Contenido del carrito */}
        </CardContent>
      </Card>

      <TableContainer>
        <Table>
          {/* Contenido de la tabla */}
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary">Finalizar compra</Button>

      <Badge badgeContent={0} color="secondary">
        {/* Contenido con contador del carrito */}
      </Badge>
    </div>
  );
}

export default Cart;