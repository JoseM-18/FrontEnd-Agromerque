import React, { useContext, useEffect, useState, } from "react";
import { Card, CardContent, Table, TableContainer, Typography, Button } from "@mui/material";
import { productContext } from "./ProductContext";
import { CircularProgress } from "@mui/material";
import { Modal } from "@mui/material";
import { TextField } from "@mui/material";


import "./css/checkout.css"


const token = localStorage.getItem('token');
function Checkout() {
  const { productos } = useContext(productContext);
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

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
                <div className="payment">
                  <Button variant="contained" color="success" onClick={handlePaymentModalOpen}>
                    Pagar
                  </Button>
                </div>

                <PaymentModal 
                  isOpen={isPaymentModalOpen} 
                  onClose={handlePaymentModalClose}
                  selectedPayment={selectedPayment}
                />
                
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

const PaymentModal = ({ isOpen, onClose, selectedPayment }) => {

  const [payment, setPayment] = useState({
    cardNumber: 0,
    dueDate: "",
    securityCode: "",
    owner: "",
    address: "",
    postalCode: 0,
    phone: "",
    email: "",

  });

  const handleChanges = (event) => {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log(payment);
    if(payment.cardNumber === "" || payment.dueDate === "" || payment.securityCode === "" || payment.owner === "" || payment.address === "" || payment.postalCode === "" || payment.phone === "" || payment.email === ""){
      alert("Debe llenar todos los campos");
      return;
    }

    if(!payment.cardNumber.match(/^\d{16}$/)){
      alert("El numero de tarjeta debe tener 16 digitos");
      return;
    }

    const response = await fetch('http://localhost:4000/paymentMethod', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(payment)

    });
    
    const data = await response.json();
    console.log(data);

    if(data.message ==="PaymentMethod created"){
      alert("Pago realizado con exito");
      onClose();
    }

    if(data.message === "PaymentMethod already exist"){
      alert("El metodo de pago ya existe");
      onClose();
    }

  };

  
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="payment-modal">

        <Typography variant="h6">Ingrese los datos de pago</Typography>
        <div className="camposPayment">

          <TextField
            id="outlined-basic"
            label="Numero de tarjeta"
            variant="outlined"
            name="cardNumber"
            onChange={handleChanges}
          />

          <TextField
            id="outlined-basic"
            label="Fecha de vencimiento (MM/AA)"
            variant="outlined"
            name="dueDate"
            inputProps={{
              pattern: "(0[1-9]|1[0-2])/(\\d{2})",
            }}
            onChange={handleChanges}
          />


          <TextField

            id="outlined-basic"
            label="Codigo de seguridad"
            variant="outlined"
            name="securityCode"
            onChange={handleChanges}
          />
          <TextField
            id="outlined-basic"
            label="Nombre del titular"
            variant="outlined"
            name="owner"
            onChange={handleChanges}
          />


          <TextField
            id="outlined-basic"
            label="Direccion"
            variant="outlined"
            name= "address"
            onChange={handleChanges}
          />

          <TextField
            id="outlined-basic"
            label="Codigo postal"
            variant="outlined"
            name="postalCode"
            onChange={handleChanges}
          />

          <TextField
            id="outlined-basic"
            label="Telefono"
            variant="outlined"
            name="phone"
            onChange={handleChanges}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChanges}
          />

        </div>

        <Button variant="contained" color="success" onClick={handleSubmit}>
          Pagar
        </Button>
      </div>
    </Modal>

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