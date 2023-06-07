import React from 'react'
import {AppBar, Toolbar, Typography, Button, Link, Container} from '@mui/material'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import "./css/Navbar.css"
import { useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';


function Navbar() {

  const navigate = useNavigate()
  
  return (
    <AppBar position="fixed">
      <Toolbar className='toolbar' >
        <Typography className='nombreTool' variant="h6"  >
          <Link href="/" className='title' style={{textDecoration:"none",color:"white"} }> 
          AgroMerque
          </Link>
        </Typography>
        <Search />
        <dev className='botones'>
          <Link href="/login" >
            <Button  variant="contained" color="success">Iniciar Sesión</Button>
            </Link>
            <Button variant="contained" color="success" onClick={() => navigate('/register')}
            >Registrarse</Button>
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