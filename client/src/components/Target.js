import React, { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Modal } from '@mui/material';
import { useNavigate } from 'react-router'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import './css/Target.css'
import SeeInfo from "./infoProduct";


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


  const addProduct = async (idProduct, amount) => {
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
    if (data === 'the product was added to the cart ' || data === 'the product was added to the cart and the stock was updated') {
      navigate('/cart')
    }
    if (data === 'Product already exists') {
      navigate('/cart')
    }

    if (data === "Unauthorized!") {
      navigate('/login')
    }

    if (data === 'you are admin, you can not buy products') {
      alert('you are admin, you can not buy products')
      return;
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

  
  return (
    <div className='Body' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}  >


      {products.map((product) => (

        <Card key={product.idProduct} className='card' sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: 400 }}>
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

            <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
              className='cardActions'
            >
              <input size={'small'}
                type="number"
                value={amount[product.idProduct] || 1}
                onChange={(e) => setCount(product.idProduct, e.target.value)}
              />
              <div className="botones">
                <IconButton sx={{
                  display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start',
                  justifyContent: 'flex-start', fontSize: '0.1rem'
                }} color="primary" onClick={() => {
                  const productAmount = amount[product.idProduct] || 1;
                  addProduct(product.idProduct, productAmount)
                }} aria-label='add shopping cart' size='small' >
                  <AddShoppingCartIcon />
                  Añadir al carrito
                </IconButton>

                <Button size="small" color="primary" onClick = {() => handleClickOpen(product.idProduct)}>
                  Info
                </Button>
                <SeeInfo idProduct={selectedProductId} isOpen={isInfoOpen} onClose={handleClose} />
              </div>
            </CardActions>
          </div>
        </Card>
      ))}
    </div>


  )
}


//exportamos el componente y la funcion de info para poder usarla en otros componentes
export default Target ;