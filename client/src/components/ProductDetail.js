import React, { useContext, useEffect, useState } from "react";
import { productContext } from "./ProductContext";
import "./css/ProductDetail.css";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <div className="productDetail">
        <h1> en proceso</h1>
      </div>
    </>
  )
}

export default ProductDetail;