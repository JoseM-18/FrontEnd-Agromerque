import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import '../css/Target.css'
import SeeInfo from "./infoProduct";
import { Snackbar } from '@mui/material';


function Target({ products }) {

  const [amount, setamount] = useState(1)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const setCount = (idProduct, value) => {
    setamount((prevamount) => ({
      ...prevamount,
      [idProduct]: value
    }))
  }

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState('');


  const addProduct = async (idProduct, amount) => {
    try {

      const response = await fetch(`http://localhost:4000/shoppingCartProduct/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
        , body: JSON.stringify({
          idProduct,
          amount
        })
      })

      const data = await response.json()
      console.log(data)
      if (data.message === 'the product was added to the cart ') {
        setMessage('Producto añadido al carrito ')
        setShowSuccessMessage(true)

      }

      if (data.message === 'the product was added to the cart and the stock was updated') {
        setMessage('Se agregaron mas unidades al carrito')
        setShowSuccessMessage(true)
        return;
      }

      if (data.message === "Unauthorized!") {
        setMessage('No estas autorizado para comprar productos, redirigiendo...')
        setShowErrorMessage(true)

        setTimeout(() => {
          navigate('/login')
        }, 3000);
        return;
      }

      if (data.message === 'you are admin, you can not buy products') {
        setMessage('Eres administrador, no puedes comprar productos')
        setShowErrorMessage(true)
        return;
      }

    } catch (error) {
      alert("Error al agregar producto al carrito")
    }
  }

  const [selectedProductId, setSelectedProductId] = useState(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const handleClickOpen = (idProduct) => {
    setSelectedProductId(idProduct)
    setIsInfoOpen(true)
  };

  const handleClose = () => {
    setSelectedProductId(null)
    setIsInfoOpen(false)
  };

  const numProducts = products.length;

  const calculateCardWidth = (numProducts) => {
    const minWidth = 30;
    const maxWidth = 100;
    const maxProductsPerRow = 3;

    const cardWidth = Math.min(
      maxWidth,
      Math.max(minWidth, maxWidth / numProducts)
    );

    return cardWidth;

  };



  return (
    <div className='Body' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}  >

      {products.map((product) => (

        <Card key={product.idProduct} style={{ flex: `0 0 ${calculateCardWidth(numProducts)}%`, maxWidth: '100%', margin: '1rem' }}>
          {products.length === 0 && (
            <Card style={{ flex: '0 0 30%', visibility: 'hidden' }} />
          )}
          <div className='content'  >

            <CardActionArea>

              <CardMedia
                sx={{ height: 140 }}
                component="img"
                alt={product.name}
                image={product.image}
              />

              <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>


                <Typography variant="body2" color="text.secondary">
                  Unidades: {product.stock}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product.salePrice} $
                </Typography>

              </CardContent>

            </CardActionArea>

            <CardActions style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', justifyContent: 'flex-start' }}
              className='cardActions'
            >
              <input size={'small'}
                type="number"
                value={amount[product.idProduct] || 1}
                onChange={(e) => setCount(product.idProduct, e.target.value)}
              />
              <div className="botones">
                <IconButton sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },

                }} color="primary" onClick={() => {
                  const productAmount = amount[product.idProduct] || 1;
                  addProduct(product.idProduct, productAmount)
                }} aria-label='add shopping cart' size='small' >
                  <AddShoppingCartIcon />
                </IconButton>

                <Button size="small" color="primary" onClick={() => handleClickOpen(product.idProduct)}>
                  Info
                </Button>
                <SeeInfo idProduct={selectedProductId} isOpen={isInfoOpen} onClose={handleClose} />

              </div>
              <Snackbar
                open={showSuccessMessage}
                autoHideDuration={3000}
                onClose={() => setShowSuccessMessage(false)}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{ marginTop: '30%' }}
              />

              <Snackbar
                open={showErrorMessage}
                autoHideDuration={3000}
                onClose={() => setShowErrorMessage(false)}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{ marginTop: '5%' }}
              />

            </CardActions>
          </div>
        </Card>
      ))}
    </div>


  )
}


//exportamos el componente y la funcion de info para poder usarla en otros componentes
export default Target;