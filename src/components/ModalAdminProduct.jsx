import { Modal, Button } from 'react-bootstrap';

const ModalAdminProduct = ({ product, onClose, isModalOpen }) => {
  if (!product) return null;

  return (
    <Modal
      show={isModalOpen}
      onHide={onClose}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div>
          <label>Nombre</label>
          <input type="text" className="form-control" value={product.name} readOnly />
        </div>
        <div>
          <label>Descripción</label>
          <textarea className="form-control" value={product.description} readOnly></textarea>
        </div>
        <div>
          <label>Precio</label>
          <input type="number" className="form-control" value={product.price} readOnly />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" className="form-control" value={product.stock} readOnly />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary">
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdminProduct;
