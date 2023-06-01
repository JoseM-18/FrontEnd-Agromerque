import React from 'react'
import "./LoginForm.css"

function LoginForm() {
  return (
    <div className="login">
      <div className="cover">
          <h1>Login</h1>

          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />

          <div className="login-btn">Login</div>
      </div>
    </div>
  )
}

export default LoginForm