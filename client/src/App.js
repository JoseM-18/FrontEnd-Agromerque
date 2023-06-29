import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoginForm from './components/js/LoginForm'
import Navbar from './components/js/Navbar'
import RegisterForm from './components/js/RegisterForm'
import Body from './components/js/Body'
import ShoppingCart from './components/js/ShoppingCart'
import ProductForm from './components/js/ProductForm'
import ProductDetail from './components/js/ProductDetail'
import Userprofile from './components/js/Userprofile'
import Checkout from './components/js/Checkout'
import Search from './components/js/SearchResult'
import DeleteProduct  from './components/js/DeleteProduct'
import UpdateProduct from './components/js/UpdateProduct'
import { Container } from '@mui/material'
import { ProductProvider } from './components/js/ProductContext';
import React, { useEffect, useState } from 'react';
import { productContext } from './components/js/ProductContext';

function App() {

  //const productos = productosDta.productos;
  const [productos, setProductos] = useState([]);
  useEffect(() => {


    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/product');
        const data = await response.json();
        if (data.message === "Product doesn't found") {
          alert("No hay productos");
          return;
        }
        console.log("Se cargaron los productos");
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
                  <Route path="/admin/delete" element={<DeleteProduct />}></Route>
                  <Route path="/admin/update" element={<UpdateProduct />}></Route>
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