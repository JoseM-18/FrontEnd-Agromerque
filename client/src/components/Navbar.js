import React, { useContext } from 'react'
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


function Navbar() {

  const navigate = useNavigate()
  const [isLogged, setIsLogged] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [username, setUserName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  // define el estado de isLogged si hay un token en el localstorage
  React.useEffect(() => {
    if (localStorage.getItem('token')) {  
      setIsLogged(true)

      const token = localStorage.getItem('token')
      const decoded = jwt_decode(token)
      const username = decoded.username
      setUserName(username)
      if (decoded.role === 'Admin') {

        setIsAdmin(true)
      }

    }

    setIsLoading(false)

  }, [])


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
                  <IconButton color="inherit" onClick={() => navigate('/admin')} >
                    <Typography variant='body-1' fontSize="14px">
                      Agregar Producto
                    </Typography>
                  </IconButton>
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



export default Navbar