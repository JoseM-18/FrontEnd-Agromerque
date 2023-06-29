import React, { useContext, useEffect, useState } from "react";
import { productContext } from "./ProductContext";
import "../css/ProductDetail.css";
import { useParams } from "react-router-dom";
import { Container } from '@mui/material';


//componente que muestra el detalle de un producto
const ProductDetail = () => {
  
  const { idProduct } = useParams();
  const { productos } = useContext(productContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const foundProduct = productos.find((producto) => producto.idProduct === idProduct);
    setProduct(foundProduct);
  }, [idProduct, productos]);

  return (
    <div className="body">
      <h1>Producto: {product && product.name}</h1>
    </div>
  );
};

export default ProductDetail