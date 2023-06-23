import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import Body from './components/Body'
import ShoppingCart from './components/ShoppingCart'
import ProductForm from './components/ProductForm'
import ProductDetail from './components/ProductDetail'
import Userprofile from './components/Userprofile'
import Checkout from './components/Checkout'
import Search from './components/SearchResult'
import { Container } from '@mui/material'
import { ProductProvider } from './components/ProductContext';
import React, { useEffect, useState } from 'react';
import { productContext } from './components/ProductContext';

function App() {

  //const productos = productosDta.productos;
  const [productos, setProductos] = useState([]);
  useEffect(() => {


    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/product');
        const data = await response.json();
        if(data.error) {
          console.log(data.error);
          return;
        }
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();


  }, [])

  return (
    <ProductProvider >
      <productContext.Provider value={{ productos, setProductos }}>
        <BrowserRouter>
          <Navbar />
            <Container>
              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/admin" element={<ProductForm />}></Route>
                <Route path="/product/:idProduct" element={<ProductDetail />}></Route>
                <Route path="/profile" element={<Userprofile />}></Route>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/Search/:searchTerm" element={<Search />}></Route>
                
                <Route path="*" element={<h1>Not Found 404</h1>} />

              </Routes>
            </Container>
        </BrowserRouter>
      </productContext.Provider>
    </ProductProvider>

  )
}

export default App