import React, { useContext, useEffect, useState, } from "react";
import { Card, CardContent, Table, TableContainer, Typography, Button } from "@mui/material";
import { productContext } from "./ProductContext";
import { CircularProgress } from "@mui/material";


import "./css/checkout.css"


const token = localStorage.getItem('token');
function Checkout() {
  const { productos } = useContext(productContext);
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {

    const cartInfo = await fetch('http://localhost:4000/shoppingCart/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }

    });
    const productsInf = await cartInfo.json();


    const productsWithAmount = productsInf.map((product) => {
      const productInfo = productos.find((p) => p.idProduct === product.idProduct);
      console.log(productInfo);
      return { ...productInfo, amount: product.amount };
    }
    );
    setProductCart(productsWithAmount);
    setIsLoading(false);

    setTotal(productsWithAmount.reduce((acc, product) => acc + product.salePrice * product.amount, 0));
  }


  useEffect(() => {
    handleSubmit();
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente


  return (
    <div className="container">
      {isLoading ? (
        <div className="loading">
        <CircularProgress />
        </div>
        

        ) : (

          
          <div className="body">
            <Typography variant="h6">Comprar productos</Typography>
            
          {productCart.length > 0 ? (
            <TableContainer component={Card}>

                {productCart.map((product) => (
                  <CardContent key={product.idProduct} className="infoProducts">
                    <Typography variant="h6" className="nameProd"> {product.name}</Typography>
                    <Typography variant="h6">Cantidad:{product.amount}</Typography>
                    <Typography variant="h6">Precio: ${product.salePrice}</Typography>
                    <Typography variant="h6">SubTotal: ${product.salePrice * product.amount}</Typography>
                    <Typography variant="h6" >Descripcion del producto: {product.description} </Typography>

                  </CardContent>
                  
                ))}
                <div className="total">
                  <Typography variant="h6">Total: ${total}</Typography>
                  </div>

              < div className="payment">
                <Typography variant="h6">Metodos de pago</Typography>
                <Button variant="contained" color="success" >Pagar</Button>
              </div>
            </TableContainer>
            //zona de metodos de pago
          ) : (
            <Typography variant="h6">No hay productos en el carrito</Typography>
          )}
        </div>
      )}
    </div>
  );
}

function Payment() {
  const [payment, setPayment] = useState([]);

  const handleSubmit = async (event) => {
    const response = await fetch('http://localhost:4000/payment', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const data = await response.json();
    setPayment(data);
  }

  useEffect(() => {
    handleSubmit();
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="body">
      <Typography variant="h6">Metodos de pago</Typography>
      {payment.length > 0 ? (
        <TableContainer component={Card}>
          <Table className="infoProduct">
            {payment.map((pay) => (
              <CardContent key={pay.idPayment} className="infoProducts">
                <Typography variant="h6" className="nameProd"> {pay.name}</Typography>
                <Typography variant="h6">Descripcion:{pay.description}</Typography>
              </CardContent>
            ))}
          </Table>
        </TableContainer>
      ) : (
        <div>

          <Typography variant="h6">No hay metodos de pago</Typography>
          <Button variant="contained" color="success" >añadir un metodo de pago</Button>

        </div>

      )}
    </div>

  );
}


export default Checkout;