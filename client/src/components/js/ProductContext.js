import React, { createContext, useState } from 'react';
/*
  * crea un contexto de productos para poder acceder a ellos desde cualquier componente
*/
const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const deleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };

  return (
    <productContext.Provider value={{ products, updateProducts,deleteProduct }}>
      {children}
    </productContext.Provider>
  );
};

export { productContext, ProductProvider };
