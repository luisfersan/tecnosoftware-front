import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalAdminUser = ({ user, onClose, isModalOpen, updateUserById }) => {
  // Crea las referencias para los campos del formulario
  const usernameRef = useRef();
  const emailRef = useRef();
  const adminRef = useRef();

  // Función para manejar la acción de guardar
  const handleSave = () => {
    const updatedData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      admin: adminRef.current.checked,
    };

    // Envía los datos al backend
    updateUserById(user.id, updatedData);
    onClose(); // Cierra el modal
  };

  if (!user) return null;

  return (
    <Modal
      show={isModalOpen}
      onHide={onClose}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              defaultValue={user.username}
              ref={usernameRef} // Asocia la referencia
            />
          </div>
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              defaultValue={user.email}
              ref={emailRef} // Asocia la referencia
            />
          </div>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="adminCheckbox"
              defaultChecked={user.admin} // Refleja el estado actual
              ref={adminRef} // Asocia la referencia
            />
            <label className="form-check-label" htmlFor="adminCheckbox">
              ¿Es administrador?
            </label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdminUser;
