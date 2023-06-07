import { BrowserRouter, Routes , Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import Target from './components/Target'
import ShoppingCart from './components/ShoppingCart'
import { Container } from '@mui/material'

import productosDta from './data/products.json'

function App() {

  const productos = productosDta.productos;

  return (

    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={ <Target products={ productos }/> } />
          <Route path="/login" element={ <LoginForm /> } />
          <Route path= "/register" element ={<RegisterForm/>}/>
          <Route path= "/cart" element={<ShoppingCart/>} />
        </Routes> 
      </Container>
    </BrowserRouter>
  
  )
}

export default App