import { useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useTienda from '../hooks/useTienda';
import { use } from 'react';
export const ModalCreateProduct = ({isModalCreateOpen, onClose, categories}) => {

  const { createProduct } = useTienda();

  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const categoryRef = useRef();



  const handleSubmit = async () => {
    const productData = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      price: parseFloat(priceRef.current.value),
      stock: parseInt(stockRef.current.value),
      category_id: parseInt(categoryRef.current.value),
    };

    await createProduct(productData)
    onClose()
  };

  return (
    <Modal show={isModalCreateOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Crear Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>Nombre</label>
          <input type="text" className="form-control" ref={nameRef} />
        </div>
        <div>
          <label>imagen</label>
          <input type="file" className="form-control" ref={imageRef} />
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
        <div>
          <label>Categoría</label>
          <select className="form-control">
            {categories.map((category, index) => (
              <option key={index} value={index} ref={categoryRef}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
