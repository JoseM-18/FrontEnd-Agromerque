import React, { useContext, useEffect,useRef } from 'react'
import { AppBar, Toolbar, Typography, Button, Link, Container, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import "./css/Navbar.css"
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { TextField, FormControl, InputLabel, Select, MenuItem, InputBase, styled, alpha } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { productContext } from './ProductContext';
import jwt_decode from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';
import jwtDecode from 'jwt-decode';
import {Modal, Box} from '@mui/material';
import {useState} from 'react';



function Navbar() {

  const navigate = useNavigate()
  const [isLogged, setIsLogged] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [username, setUserName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [open, setOpen] = useState(false);
  // define el estado de isLogged si hay un token en el localstorage
  React.useEffect(() => {
    
    if (localStorage.getItem('token')) {  
      
      
      const token = localStorage.getItem('token')
      const decoded = jwt_decode(token)
      const username = decoded.username
      //verificamos que el token no este expirado
      if (decoded.exp < Date.now() / 1000) {
        setIsLogged(false)
        localStorage.removeItem('token')
        localStorage.removeItem('productsCart')
        alert('Su sesión ha expirado, por favor inicie sesión nuevamente')
        navigate('/login')
      }

      setIsLogged(true)
      setUserName(username)
      if (decoded.role === 'Admin') {

        setIsAdmin(true)
      }

    }

    setIsLoading(false)

  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogout = () => {
    setIsLogged(false)
    localStorage.removeItem('token')
    localStorage.removeItem('productsCart')
    navigate('/')

    window.location.reload()
  }

  return (
    <div className='root'>
      {isLoading ? (
        <div className='loading'>
          <CircularProgress />
        </div>
      ) : (
        <AppBar position="fixed">
          <Toolbar className='toolbar' >
            <Typography className='nombreTool' variant="h6"  >
              <Link href="/" className='title' style={{ textDecoration: "none", color: "white" }}>
                AgroMerque
              </Link>
            </Typography>

            <Search />

            {isLogged ? (
              <>

                {isAdmin ? (
                  <div>
                  <IconButton color="inherit" onClick={() => handleClickOpen()} >
                    <Typography variant='body-1' fontSize="14px">
                      Gestionar Productos
                    </Typography>
                  </IconButton>
                    <Options isOpen={open} onClose={handleClose}  /> 
                  </div>
                  
                )
                  : (

                    <IconButton color="inherit" onClick={() => navigate('/cart')}>
                      <ShoppingCartIcon />
                      <Typography variant='body-1' fontSize="14px">
                        Carrito
                      </Typography>
                    </IconButton>

                  )}
                <IconButton color="inherit" onClick={() => navigate('/profile')}>
                  <Typography variant='body-1' fontSize="14px">
                    Hola {username}
                    <br />
                    Ver Perfil
                  </Typography>
                </IconButton>

                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                  <Typography variant='body-1' fontSize="14px">
                    Cerrar Sesión
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                <Button variant="contained" color="success" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                <Button variant="contained" color="success" onClick={() => navigate('/register')}
                >Registrarse</Button>

              </>
            )}
          </Toolbar>
        </AppBar>
      )}

    </div>
  )
}


function Search() {
  const [search, setSearch] = React.useState('')
  const {products} = useContext(productContext)
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async (event) => {
    
    if(search.trim() !== ''){
      navigate(`/search/${search}`)
    }

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (search === '') {
        return alert('Ingrese un producto')
      }
      handleSubmit();
    }
  };


  return (

    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <TextField
        sx={{ flex: 1 }}
        placeholder="Busca nuestros productos"
        inputProps={{ 'aria-label': 'Busca nuestros productos' }}
        name="name"
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );

}

function Options ({isOpen,onClose}){
  //creamos un modelo para mostrar los botones de crear producto, editar producto y eliminar producto

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/admin')
    onClose()
  }

  const handleEdit = () => {
    navigate('/admin/update')
    onClose()
  }

  const handleDelete = () => {
    navigate('/admin/delete')
    onClose()
  }

  const handleCloseModal = () => {
    onClose()
  }

  const modalRef = useRef()
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',background:'trasparent' }}>
        <div className="modal-content" ref={modalRef}>
          <Button variant="contained" color="success" className="modal-button" onClick={handleCreate}>
            Crear Producto
          </Button>
          <Button variant="contained" color="success" className="modal-button" onClick={handleEdit}>
            Editar Producto
          </Button>
          <Button variant="contained" color="success" className="modal-button" onClick={handleDelete}>
            Eliminar Producto
          </Button>
        </div>
      </div>
    </Modal>
  );
  

  
}


export default Navbar