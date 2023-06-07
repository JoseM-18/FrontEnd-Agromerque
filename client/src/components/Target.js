import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import "./css/Target.css"

function Target({ products }) {
  return (
    
    <Card sx={{ maxWidth: 245 }}>

      {products.map((product) => (
        
        
      <>
        <CardActionArea>
          <CardMedia
            sx={{ height: 200 }}
            component="img"
            alt= { product.nombre }
            image= { product.imagen } />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              { product.nombre }
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Unidades { product.stock } 
              </Typography>

              <Typography variant="body2" color="text.secondary">
                { product.precio } $
              </Typography>
            </div>

          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="small" color="primary">
            Añadir al carrito
          </Button>
          <Button size="small" color="primary">
            Info
          </Button>  
        </CardActions>
      </>

      ))}
    </Card>
    
  );
}

export default Target
