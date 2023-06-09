import React, { useContext, useEffect, useState, } from "react";
import { Card, CardContent, TableContainer, Typography, Button } from "@mui/material";
import { productContext } from "./ProductContext";
import { CircularProgress } from "@mui/material";
import { Modal } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import "../css/checkout.css"
import usePageTitle from "./PageTitle";
import { redirect, useNavigate } from "react-router-dom";


const token = localStorage.getItem('token');
function Checkout() {
  usePageTitle('Checkout');
  const navigate = useNavigate();

  const { productos } = useContext(productContext);
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [productsToSend, setProductsToSend] = useState([]);


  const handleSubmit = async (event) => {

    
    try {

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
        return { ...productInfo, amount: product.amount };
      }
      );

      const productsToSend = productsWithAmount.map((product) => {
        return { idProduct: product.idProduct, amount: product.amount };
      }

      );

      setProductsToSend(productsToSend);
      setProductCart(productsWithAmount);
      setIsLoading(false);

      setTotal(productsWithAmount.reduce((acc, product) => acc + product.salePrice * product.amount, 0));
    }
    catch (error) {
      alert("No se pudo cargar el carrito de compras");
    }
  };

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


        <div className="body" style={{background:'#7ED84E', marginTop:'1%'}}>
          {//ajustamos el estilo de la letra y el color de la letra}
          }

          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10%', fontSize: '50px' }}>Comprar productos</Typography>
          <hr></hr>

          {productCart.length > 0 ? (
            <TableContainer component={Card}>

              {productCart.map((product) => (
                <CardContent key={product.idProduct} className="infoProducts">
                  <Typography variant="h6" className="nameProd" style={{fontSize:'2rem'}}> {product.name}</Typography>
                  <Typography variant="h6">Cantidad:{product.amount}</Typography>
                  <Typography variant="h6">Precio: ${product.salePrice}</Typography>
                  <Typography variant="h6">SubTotal: ${product.salePrice * product.amount}</Typography>
                  <hr></hr>

                </CardContent>
              ))}
              <Typography variant="h6" style={{ textAlign: 'center',fontSize:'2rem' }} >Total: ${total}</Typography>
              <Payment productsToSend={productsToSend} total={total} />

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

const PaymentModal = ({ isOpen, onClose, onPaymentAdded }) => {

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

    if (payment.cardNumber.match(/^4\d{15}$/)) {
      setPayment({ ...payment, target: 'Visa' });

    } else if (payment.cardNumber.match(/^5\d{15}$/)) {
      setPayment({ ...payment, target: 'MasterCard' });
    } else {
      alert("El numero de tarjeta no es valido");
      return;
    }

    try {

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

    } catch (error) {
      alert("tuvimos un problema al procesar el pago")
    };

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

function Payment({ total, productsToSend }) {
  const [payment, setPayment] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const navigate = useNavigate();

  const handleSubmitOrder = async (event) => {
    if (selectedPayment === "" || selectedPayment === "Seleccione un metodo de pago") {
      alert("Debes seleccionar un metodo de pago");
      return;
    }
    try {

      const response = await fetch('http://localhost:4000/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          selectedPayment,
          productsToSend,
          total
        })

      });
      const data = await response.json();

      if (data.message === "Order created successfully") {
        alert("Orden creada con exito");
        setOrderConfirmation(data);
      }

    } catch (error) {
      alert("tuvimos un problema al procesar la orden")
    };
  };
  const handleChangePayment = (event) => {
    const selectedPayment = event.target.value;
    setSelectedPayment(selectedPayment);
  };

  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };


  const handleSubmit = async (event) => {

    try {

      const response = await fetch('http://localhost:4000/paymentMethod', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });

      const data = await response.json();
      if (data.message === "Token is not valid") {
        alert("Debe iniciar sesion");
        return;
      }

      if (data.message !== "There are not payment methods") {
        setPayment(data);
      }


    } catch (error) {
      alert("tuvimos un problema al procesar la orden")
    };

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
            label="Metodos de pago"
            onChange={handleChangePayment}
          >
            {payment.map((payment) => (
              <MenuItem value={payment}>{payment.target} Terminada en {payment.cardNumber.substring(payment.cardNumber.length - 4)}
              </MenuItem>



            ))}
          </Select>

          <Button variant="contained" style={{marginTop:'10px', marginBottom:'10px'}} className="addPayment" color="success" onClick={handlePaymentModalOpen}>
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
      <Button variant="contained" color="success" onClick={handleSubmitOrder} >Pagar</Button>
      {orderConfirmation && <Confirm order={orderConfirmation} />}

    </div>
  );
}


const Confirm = ({ order }) => {
  const navigate = useNavigate();
  if (!order) {
    return null;
  }
  const redirect = () => {
    navigate('/');
    window.location.reload();
  }
  return (
    <Modal open={true} >
      <div className="payment-modal" style={{ textAlign: 'center' }}>
        <Typography variant="h6" style={{ fontSize: "30px", fontWeight: 'bold' }}>Su orden ha sido creada con exito</Typography>
        <Typography variant="h6">Numero de orden: {order.idOrder}</Typography>
        <Typography variant="h6">Total: {order.orderTotal}</Typography>
        <Typography variant="h6">Productos: {order.products.map((product) => (
          <div>
            <Typography variant="h6">Nombre: {product.name}</Typography>
            <Typography variant="h6">Cantidad: {product.amount}</Typography>
            <Typography variant="h6">Precio: {product.salePrice}</Typography>
            <hr />
          </div>
        ))}</Typography>
        <Button variant="contained" color="success" onClick={() => redirect()}>Aceptar</Button>

      </div>
    </Modal>
  );

};

export default Checkout;

