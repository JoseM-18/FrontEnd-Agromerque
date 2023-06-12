import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./css/Target.css"
import { useNavigate } from 'react-router-dom'


function Target({ products }) {
  const navigate = useNavigate()

 
  return (
    <div className='Body'>
      <Card className='card' sx={{ maxWidth: 800 }}>

        {products.map((product) => (

          <div className='content'>

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
              <Button size="small" color="primary">
                Añadir al carrito
              </Button>

              <Button size="small" color="primary"
                /*onClick={() => navigate(`/product/${product.idProduct}`)}*/
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