import { BrowserRouter, Routes , Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navbar /> } />
        <Route path="/login" element={ <LoginForm /> } />
      </Routes> 
    </BrowserRouter>
  
  )
}

export default App