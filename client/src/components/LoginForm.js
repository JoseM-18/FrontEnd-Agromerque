import React from 'react'
import "./css/LoginForm.css"
import {Button,TextField} from '@mui/material'
function LoginForm() {
  return (
    <div className="login">
      <div className="cover">
          <h1>Iniciar Sesión en AgroMerque</h1>
          <div className='inputs'>
          <TextField
            label="Username"
            variant="outlined"
            className='camposTextos'
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            className='camposTextos'
          />
          </div>
          <Button variant="contained" color="success">Entrar</Button>
      </div>
    </div>
  )
}

export default LoginForm