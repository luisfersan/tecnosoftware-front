import { Modal, Button } from 'react-bootstrap';
import './Products.css';

const ModalProduct = ({ product, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <img
            src={`/img/${product.image}`}
            alt={product.name}
            className="img-fluid mb-3"
            style={{ width: '100%', maxWidth: '300px' }}
          />
          <h5>{product.name}</h5>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary">Agregar al carrito</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProduct;
