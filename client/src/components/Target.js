import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./css/Target.css"

function Target() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 300 }}
          component="img"
          alt="green tomato"
          image="https://www.agro.bayer.co/es-co/_jcr_content/root/responsivegrid/responsivegrid_copy_/promo_copy_copy_668018259.coreimg.jpeg/1661455349404/promo-tomate-agro-bayer-colombia.jpeg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Producto
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta es la maravillosa descripcion que tendra el producto dependiendo de la base de datos
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={
        { display: 'flex', justifyContent: 'space-between' }
      }>
        <Button size="small" color="primary">
          Añadir al carrito
        </Button>
        <Typography gutterBottom variant="h5" component="div">
          $1000
        </Typography>
      </CardActions>
    </Card>
  );
}

export default Target
