import { React, useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import "./css/LoginForm.css"
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()
  //se conecta con el backend para verificar si el usuario existe

  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [usernameIncorrect, setUsernameIncorrect] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario de registro
    try{

      const res = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const date = await res.json()
      
      console.log(date.message)
      
      
      setUsernameIncorrect(false)
      setPasswordIncorrect(false)
      
      if (date.token) {
        localStorage.setItem('token', date.token)
        navigate('/')
        window.location.reload()
    }
    
    if(date.message === 'invalid access, verify your username'){
      setUsernameIncorrect(true)
    }
    
    if(date.message === 'Invalid Password'){
      setPasswordIncorrect(true)
    }

    if(date.message === "Please. Send all data"){
      alert(date.message)
    }
    
 }catch(error){
    //mostrar una ventana usando dialog
    alert("Error al iniciar sesión")
 } 
    
};
  
  //constante que guarda los datos del formulario
  const [login, setlogin] = useState({
    username: "",
    password: "",
  })
  const location = useLocation()
  const showBlurBackground = location.pathname === '/login'
  const handleChange = event => {

    //introductir los datos del formulario en el estado
    setlogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };


  return (
    //verifica si esta en la pagina de login para poner el blur(fondo borroso)
    <div className={showBlurBackground ? 'blur-background' : ''}>
      <div className="login">
        <form onSubmit={handleSubmit} className='cover'>
          <h1>Iniciar Sesión en AgroMerque</h1>

          <div className='inputs'>
            <TextField
              label="username"
              variant="outlined"
              className={`camposTextos ${usernameIncorrect ? 'error' : ''}`}
              name="username"
              error={usernameIncorrect}
              helperText={usernameIncorrect && 'Usuario incorrecto'}
              onChange={handleChange}
            />

            <TextField
              label="password"
              variant="outlined"
              type="password"
              className={`camposTextos ${passwordIncorrect ? 'error' : ''}`}
              name="password"
              error={passwordIncorrect}
              helperText={passwordIncorrect && 'Contraseña incorrecta'}
              onChange={handleChange}
            />
          
            <Button variant="contained" color="success" type='submit'>Entrar</Button>
            <Button variant="contained" color="success" type='submit' onClick={() => navigate('/')}>Cancelar</Button>

          </div> 
        </form>
            
      </div>
       
           
            
    </div>
  )
}



export default LoginForm 