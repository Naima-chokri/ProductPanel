import React, { useState } from 'react';
import './ProductPanel.css'; 


const ProductPanel = () => {
  const products = [
    {
      id: 1,
      name: 'Product A',
      price: 70,
      isGift: true,
      giftPrice: 40,
    },
    {
      id: 2,
      name: 'Product B',
      price: 45,
      isGift: false,
      giftPrice: 0,
    },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [remainingCredit, setRemainingCredit] = useState(200);

  const handleProductSelect = (product) => {
    if (product.price <= remainingCredit) {
      setRemainingCredit(remainingCredit - product.price);
      setSelectedProducts([...selectedProducts, product]);
    }else {
      const partialPrice = remainingCredit;
      const remainingPrice = product.price - partialPrice;

      setSelectedProducts(prevSelected => [
        ...prevSelected,
        { ...product, price: partialPrice },
        { ...product, price: remainingPrice, quantity: 1 },
      ]);

      setRemainingCredit(0);
    }
  };

  return (
    
    <div className="container mt-5">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />


      <div className="row">
        <h1 style = {{ marginBottom : 70 , color: 'blue' }}>Products Panel</h1>
        <div className="col-lg-8">
          <h2>Selected Products</h2>
          <div className="selected-products">
            {selectedProducts.map(product => (
              <div key={product.id} className="selected-product card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price} Dt</p>
                  {product.quantity && <p>Quantity: {product.quantity}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div style={{color: 'blue'}} className="remaining-credit mb-3">
            Remaining Credit: {remainingCredit} Dt
          </div>
          <h2>Product List</h2>
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price} Dt</p>
                  <button className="btn btn-primary" onClick={() => handleProductSelect(product)}>
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;