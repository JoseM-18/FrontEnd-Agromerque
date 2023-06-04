import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';

function RegisterForm() {


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(signin.password !== signin.confirmPassword){
      alert("Las contraseñas no coinciden")
      return
    }
    console.log(signin)
    // Lógica para manejar el envío del formulario de registro
    const res = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      body: JSON.stringify(signin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const date = await res.json()
    console.log(date)
    console.log(date.message)
    if(date.message === 'user created successfully'){
      alert(date.message)
      window.location.href = '/login'
    }else if(date.message === 'user already exists'){
      alert(date.message)
    }
  };

  const [signin, setsignin] = useState({
    name: "",
    lastname: "",
    phone: "",
    address: "",
    email: "",
    birthdate: "",
    username: "",
    password: "",
    confirmPassword: "",
    
  })


  const handleChange = event=> {

    setsignin({
      ...signin,
      [event.target.name]: event.target.value,
    });
  };
 
  
  return (
    <div className="register">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} >
        
        
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='name'
          onChange={handleChange}
          
        />

        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='lastname'
          onChange={handleChange}

        />

        <TextField
          label="Celular"
          variant="outlined"
          type='number'
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='phone'
          onChange={handleChange}

        />

        <TextField
          label="Direccion"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='address'
          onChange={handleChange}

        />
       
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='email'
          onChange={handleChange}

        />

        <TextField 
        label = "Fecha de nacimiento"
        variant = "outlined"
        type = "date"
        InputLabelProps = {{shrink: true}}
        margin = "normal"
        style = {{width: '50%', margin: '10px 3px'}}
        name='birthdate'
        onChange={handleChange}

        />

        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='username'
          onChange={handleChange}

        />

        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='password'
          onChange={handleChange}

        />
        <TextField
          label="Confirmar Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          style={textFieldStyle}
          name='confirmPassword'
          onChange={handleChange}

        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </form>
    </div>
  );
}

const textFieldStyle = {
  width: '50%',
  margin: '10px 3px',
};

export default RegisterForm;