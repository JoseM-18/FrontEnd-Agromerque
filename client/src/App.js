import { BrowserRouter, Routes , Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'

function App() {
  return (

    <BrowserRouter>
      <Container>
      <Routes>
        <Route path="/" element={ <Navbar /> } />
        <Route path="/login" element={ <LoginForm /> } />
      </Routes> 
      </Container>
    </BrowserRouter>
  
  )
}

export default App