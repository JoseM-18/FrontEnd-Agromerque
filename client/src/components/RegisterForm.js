import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';

function RegisterForm() {



  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario de registro
    console.log(signin)
    
  };

  const [signin, setsignin] = useState({
    Username: "",
    Password: "",
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
        />

        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
        />

        <TextField
          label="Celular"
          variant="outlined"
          type='number'
          fullWidth
          margin="normal"
          style={textFieldStyle}
        />

        <TextField
          label="Direccion"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
        />
       
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          style={textFieldStyle}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          style={textFieldStyle}
        />
        <TextField
          label="Confirmar Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          style={textFieldStyle}
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