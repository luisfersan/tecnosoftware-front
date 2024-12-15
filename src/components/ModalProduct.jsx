import { Modal, Button } from 'react-bootstrap';
import './Products.css';

const ModalProduct = ({ product, show, onClose, onAddToCart }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <img
            src={`/img/${product.image}`}
            alt={product.product_name}
            className="img-fluid mb-3"
            style={{ width: '100%', maxWidth: '300px' }}
          />
          <h5>{product.product_name}</h5>
          <p>{product.product_description}</p>
          <p>Precio: ${product.product_price}</p>
          <p>Stock: {product.product_stock}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => onAddToCart(product)}>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProduct;
