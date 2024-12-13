import DataTable from 'react-data-table-component';
import useTienda from '../hooks/useTienda';
import { Button, Modal, Form } from 'react-bootstrap'

export const Usuario = () => {

  const {
    user,
    purchasedProducts,
    showEditModal,
    handleSetShowEditModal,
    showEvaluateModal,
    handleSetShowEvaluateModal,
    selectedProduct,
    handleSetSelectedProduct,
    editedUser,
    handleSetEditedUser,
    rating,
    handleSetRating,
    comment,
    handleSetComment,
    handleEditUser,
    handleEvaluateProduct
  } = useTienda();


  const columns = [
    {
      name: 'Producto',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Fecha de Compra',
      selector: row => row.fecha_compra,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <Button
          variant="info"
          onClick={() => {
            handleSetSelectedProduct(row)
            handleSetShowEvaluateModal(true)
          }}
        >
          Evaluar
        </Button>
      ),
    },
  ]

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Información del Usuario */}
        <div className="col-md-4">
          <h3>Información del Usuario</h3>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <Button variant="primary" onClick={() => handleSetShowEditModal(true)}>Editar Información</Button>
        </div>

        {/* Tabla de Productos Comprados */}
        <div className="col-md-8">
          <h3>Productos Comprados</h3>
          <DataTable
            columns={columns}
            data={purchasedProducts}
            noDataComponent="Todavia no has realizado una compra"
            pagination
            highlightOnHover
          />
        </div>

        {/* Modal para Editar Usuario */}
        <Modal show={showEditModal} onHide={() => handleSetShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editedUser.username}
                  onChange={e => handleSetEditedUser({ ...editedUser, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editedUser.email}
                  onChange={e => handleSetEditedUser({ ...editedUser, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={editedUser.password}
                  onChange={e => handleSetEditedUser({ ...editedUser, password: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleSetShowEditModal(false)}>Cerrar</Button>
            <Button variant="primary" onClick={handleEditUser}>Guardar Cambios</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para Evaluar Producto */}
        <Modal show={showEvaluateModal} onHide={() => handleSetShowEvaluateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Evaluar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formRating">
                <Form.Label>Calificación (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  value={rating}
                  onChange={e => handleSetRating(e.target.value)}
                  min="1"
                  max="5"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formComment">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={e => handleSetComment(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleSetShowEvaluateModal(false)}>Cerrar</Button>
            <Button variant="primary" onClick={handleEvaluateProduct}>Enviar Evaluación</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}