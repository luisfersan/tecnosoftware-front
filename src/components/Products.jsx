import { useState } from 'react';
import { products } from '../data/products';
import ModalProduct from './ModalProduct';
import useTienda from '../hooks/useTienda';
import './Products.css';

export const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useTienda();

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center text-white mt-0">Destacados</h1>
      <div className="row justify-content-center">
        {products.data.products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="card shadow" style={{ width: '20rem' }}>
              <img src='/img/imagen5.png' className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column align-items-center justify-content-between p-2">
                <h5 className="card-title mt-0 text-center">{product.name}</h5>
                <div className="d-flex justify-content-between gap-3">
                  <button
                    type="button"
                    className="btn btn-primary w-100 text-white"
                    onClick={() => handleShow(product)}
                  >
                    Ver más
                  </button>
                  <button
                    type="button"
                    className="btn btn-success w-100 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {selectedProduct && (
        <ModalProduct
          product={selectedProduct}
          show={showModal}
          onClose={handleClose}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};
