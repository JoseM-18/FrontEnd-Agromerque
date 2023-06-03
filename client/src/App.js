import { BrowserRouter, Routes , Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import Target from './components/Target'
import { Container } from '@mui/material'

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={ <Target /> } />
          <Route path="/login" element={ <LoginForm /> } />
          <Route path= "/register" element ={<RegisterForm/>}/>
        </Routes> 
      </Container>
    </BrowserRouter>
  
  )
}

export default App