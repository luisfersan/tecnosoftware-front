import { Modal, Button } from 'react-bootstrap';

const ModalAdminUser = ({ user, onClose, isModalOpen }) => {
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

        <div>
          <label>Nombre</label>
          <input type="text" className="form-control" value={user.username} readOnly />
        </div>
        <div>
          <label>Correo electrónico</label>
          <input type="email" className="form-control" value={user.email} readOnly />
        </div>
        <div>
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

export default ModalAdminUser;
