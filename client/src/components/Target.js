import React, { useState, } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./css/Target.css"
import { useNavigate } from 'react-router'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';



function Target({ products }) {
  
  const [amount, setamount] = useState(1)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')


  const setCount = (idProduct, value) => {
    console.log(idProduct, value)
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
    console.log(idProduct)

    const data = await response.json()
    console.log(data)
    if (data.message === 'Product added successfully') {
      navigate('/shoppingCart')
    }

    if (data.message === 'Product already exists') {
      navigate('/shoppingCart')
    }

    if (data.message === "Unauthorized!") {
      navigate('/login')
    }
  }
  
  return (
    <div className='Body' >
      <Card className='card' sx={{ maxWidth: 800 }}>

        {products.map((product) => (

          <div className='content' key={product.idProduct}>

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


                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Unidades: {product.stock}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {product.salePrice} $
                  </Typography>
                </div>

              </CardContent>

            </CardActionArea>

            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}
              className='cardActions'
            >
              <div className="quantity-container">
                <input size={'small'}
                  type="number"
                  value={amount[product.idProduct] || 1}
                  onChange={(e) => setCount(product.idProduct, e.target.value)}
                />
              </div>
              <IconButton className='anadir' color="primary" onClick={() => {
                const productAmount = amount[product.idProduct] || 1;
                addProduct(product.idProduct, productAmount)
              }} aria-label='add shopping cart' size='small' >
                <AddShoppingCartIcon />
                Añadir al carrito
              </IconButton>

              <Button size="small" color="primary"
                onClick={() => navigate("/product")}
              >
                Info
              </Button>
            </CardActions>

          </div>

        ))}
      </Card>
    </div>


  )
}





export default Target