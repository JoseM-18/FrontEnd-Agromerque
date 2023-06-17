import React, { useContext, useEffect, useState } from "react";
import { productContext } from "./ProductContext";
import "./css/ProductDetail.css";
import { useParams } from "react-router-dom";
import { Container } from '@mui/material';
import { useLocation } from 'react-router'

//componente que muestra el detalle de un producto
const ProductDetail = () => {
  ;
/*
  const { id } = useParams();
  const { productos } = useContext(productContext);
  const [product, setProduct] = useState({});


  useEffect(() => {
    const product = productos.find((productos) => productos.idProduct === id);
    setProduct(product);
  }, [id, productos]);
*/

  const { productos } = useContext(productContext);
  const [products, setProducts] = useState([]);

  /*const productsWithAmount = products.map((product) => {
    const ids = product.idProduct;
    const productInfo = productos.find((p) => p.idProduct === ids);
    return { ...productInfo, amount: product.amount };
    }

  );*/

  return (
    
    <>
      <Container className="productDetail">
        <h1> Puto </h1>
      </Container>
    </>
  )
}

export default ProductDetail;