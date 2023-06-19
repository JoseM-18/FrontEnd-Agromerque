import React, { useContext, useEffect, useState, } from "react";
import { Card, CardContent, Table, TableContainer, Typography, Button } from "@mui/material";
import { productContext } from "./ProductContext";
import { CircularProgress } from "@mui/material";
import { Modal } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import "./css/checkout.css"
import usePageTitle from "./PageTitle";

const token = localStorage.getItem('token');
function Checkout() {
  usePageTitle('Checkout');
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
                <Payment />
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

const PaymentModal = ({ isOpen, onClose,onPaymentAdded  }) => {

  const [payment, setPayment] = useState({
    cardNumber: 0,
    dueDate: "",
    securityCode: "",
    owner: "",
    address: "",
    postalCode: 0,
    phone: "",
    email: "",
    target: "",

  });

  const handleChanges = (event) => {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (payment.cardNumber === "" || payment.dueDate === "" || payment.securityCode === "" || payment.owner === "" || payment.address === "" || payment.postalCode === "" || payment.phone === "" || payment.email === "") {
      alert("Debe llenar todos los campos");
      return;
    }
    if (!payment.cardNumber.match(/^\d{16}$/)) {
      //verificar si los 4 primeros digitos son de visa o mastercard
      alert("El numero de tarjeta debe tener 16 digitos");
      return;
    }

    if(payment.cardNumber.match(/^4\d{15}$/)){
      setPayment({ ...payment, target: 'Visa' });

    }else if(payment.cardNumber.match(/^5\d{15}$/)){
      console.log("entro");
      setPayment({ ...payment, target: 'MasterCard' });
    }else{
      alert("El numero de tarjeta no es valido");
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

    if (data.message === "PaymentMethod created") {
      alert("Pago realizado con exito");
      onPaymentAdded();
      onClose();
    }

    if (data.message === "PaymentMethod already exist") {
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
            name="address"
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
          agregar
        </Button>
      </div>
    </Modal>

  );

}

function Payment() {
  const [payment, setPayment] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  
  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSubmit = async (event) => {

    const response = await fetch('http://localhost:4000/paymentMethod', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });

    const data = await response.json();
    if(data.message === "Token is not valid"){
      alert("Debe iniciar sesion");
      return;
    }

    if(data.message !== "There are not payment methods"){
      setPayment(data);
    }


  }

  useEffect(() => {
    handleSubmit();
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="body-pay">
      <Typography variant="h6">Metodos de pago</Typography>
      {payment.length > 0 ? (
        <FormControl className="formControl">
          <InputLabel id="demo-simple-select-outlined-label">Metodos de pago</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={(event) => setSelectedPayment(event.target.value)}
            label="Metodos de pago"
          >
            {payment.map((payment) => (
              <MenuItem value={payment}>{payment.target} Terminada en {payment.cardNumber.substring(payment.cardNumber.length - 4)}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" className="addPayment" color="success" onClick={handlePaymentModalOpen}>
            añadir un metodo de pago
          </Button>

        </FormControl>

      ) : (
        <div>

          <Typography variant="h6">No hay metodos de pago</Typography>
          <Button variant="contained" color="success" onClick={handlePaymentModalOpen} >añadir un metodo de pago</Button>

        </div>

      )}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        onPaymentAdded={handleSubmit}
      />
      <Button variant="contained" color="success" >Pagar</Button>

    </div>

  );
}






export default Checkout;