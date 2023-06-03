import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';


function RegisterForm() {

  const [selectedDate, setSelectedDate] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario de registro
    
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    
  
  return (
    <div className="register">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Celular"
          variant="outlined"
          type='number'
          fullWidth
          margin="normal"
        />

        <TextField
          label="Direccion"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <DatePicker
          label="Fecha de nacimiento"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" />}
          margin="normal"
          fullWidth
        />
       
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;