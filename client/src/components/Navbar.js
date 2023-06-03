import React from 'react'
import "./css/Navbar.css"
import {AppBar, Toolbar, Typography, Button, Link,Container, Box} from '@mui/material'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

function Navbar() {
  return (
      <AppBar position="fixed">
        <Toolbar className='toolbar' >
          <Typography className='nombreTool' variant="h6"  >
            AgroMerque
          </Typography>
          <Search />
          <dev className='botones'>
            <Link href="/login" >
              <Button  variant="contained" color="success">Iniciar Sesión</Button>
              </Link>
            <Link href="/register"  >
              <Button variant="contained" color="success">Registrarse</Button>
            </Link>
          </dev>
        </Toolbar>
      </AppBar>
  )
}

function Search() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca nuestros productos"
        inputProps={{ 'aria-label': 'Busca nuestros porductos' }}
      />
      <SearchIcon />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
  );
}



export default Navbar