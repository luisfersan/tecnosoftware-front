import { useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useTienda from '../hooks/useTienda';

const ModalAdminProduct = ({ product, onClose, isModalOpen, updateProductById }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();

  useEffect(() => {
    if (product) {
      // Establecer valores iniciales cuando el producto cambia
      nameRef.current.value = product.name;
      descriptionRef.current.value = product.description;
      priceRef.current.value = product.price;
      stockRef.current.value = product.stock;
    }
  }, [product]);

  const handleSubmit = async () => {
    const updatedData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: parseFloat(priceRef.current.value),
      stock: parseInt(stockRef.current.value),
    };

    await updateProductById(product.id, updatedData); // Llamar al contexto
    onClose(); // Cerrar el modal
  };

  if (!product) return null;

  return (
    <Modal show={isModalOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>Nombre</label>
          <input type="text" className="form-control" ref={nameRef} />
        </div>
        <div>
          <label>Descripción</label>
          <textarea className="form-control" ref={descriptionRef}></textarea>
        </div>
        <div>
          <label>Precio</label>
          <input type="number" className="form-control" ref={priceRef} />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" className="form-control" ref={stockRef} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdminProduct;
