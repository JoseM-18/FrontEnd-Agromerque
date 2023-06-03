import { React, useState, useEffect} from 'react'
import { Button, TextField } from '@mui/material'
import "./css/LoginForm.css"
import { useNavigate } from 'react-router'


function LoginForm() {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario de registro
    console.log(login)
    const res = await fetch('http://localhost:4000/signin',{
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const date = await res.json()

    if(date.token){
      localStorage.setItem('token',date.token)
      navigate('/')
    }
    console.log(date)
  };

  const [login, setlogin] = useState({
    username: "",
    password: "",
  })

  const handleChange = event=> {

    setlogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login">
        <form onSubmit={handleSubmit} className='cover'>
        <h1>Iniciar Sesión en AgroMerque</h1>

        <div className='inputs'>
          <TextField
            label="username"
            variant="outlined"
            className='camposTextos'
            name = "username"
            onChange={handleChange}
          />
              
          <TextField
            label="password"
            variant="outlined"
            type="password"
            className='camposTextos' 
            name = "password"
            onChange={handleChange}
          />

        </div>
          
        <Button variant="contained" color="success" type='submit'>Entrar</Button>
      </form>
    </div>
  )
}

export default LoginForm