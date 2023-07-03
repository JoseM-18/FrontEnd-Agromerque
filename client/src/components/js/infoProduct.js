import React, { useContext, useEffect, useState } from 'react';
import { productContext } from './ProductContext';
import { Modal } from '@mui/material';

function SeeInfo({ idProduct, isOpen, onClose }) {
  const { productos } = useContext(productContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const foundProduct = productos.find((producto) => producto.idProduct === idProduct);
    setProduct(foundProduct);
  }, [idProduct, productos]);

  return (
    <Modal open={isOpen} onClose={onClose}>
    <div
      className="infoProd"
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '7% auto 1rem',
        width: '80%',
        height: '76%',
        padding: '0 1rem',
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        marginTop: '10%',
        boxShadow: '0 0 40px 0 ',
        fontSize: '1rem', // Ajusta el tamaño de fuente general
        overflow: 'scroll',
        justifyContent: 'center',
        wordWrap: 'break-word',
      }}
    >
      {product && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10rem' }}>
          <img
            src={product.image}
            alt="Product"
            style={{ width: '50%', marginRight: '1rem' }} // Ajusta el tamaño de la imagen y el margen derecho
          />
          <div style={{marginBottom: '1rem', marginTop: '12%'}}>
            <h1 style={{ fontSize: '2.5rem', color: product.color, marginBottom: '1rem' }}>
              {product.name}
            </h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Descripción:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.description}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Categoría:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.categoryname}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Precio:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.salePrice}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Stock:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.stock}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fecha de cosecha:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.harvestDate}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Peso:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.weight} kg</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>tamaño:</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{product.size}</p>
          </div>
        </div>
      )}
    </div>
  </Modal>
);
}

export default SeeInfo;