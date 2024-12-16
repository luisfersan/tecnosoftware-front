import DataTable from 'react-data-table-component';
import useTienda from '../hooks/useTienda';
import { Button, Modal, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react';

export const Usuario = () => {

  const {
    profile,
    updateProfile,
    purchasedProducts,
    getPurchasedProducts,
    showEditModal,
    handleSetShowEditModal,
    showEvaluateModal,
    handleSetShowEvaluateModal,
    selectedProduct,
    handleSetSelectedProduct,
    evaluateProduct
  } = useTienda();


    const [evaluation, setEvaluation] = useState({
      rating: 5,
      comment: "",
    });

    const handleEvaluationChange = (e) => {
      setEvaluation({
        ...evaluation,
        [e.target.name]: e.target.value,
      });
    };

    const handleEvaluateSubmit = (e) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario.
      evaluateProduct(selectedProduct.product_id, evaluation); // Llama a la función del contexto con el producto y la evaluación.
    };

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

  useEffect(() => {
        getPurchasedProducts(profile?.id);
  }, []);

  return (
    <div className="container mt-4 py-5">
    {/* Información del Perfil */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-white">Mi Perfil</h2>
    </div>

    <div className="card p-3 mb-4">
      <h5>Información del Usuario</h5>
      <p><strong>Nombre:</strong> {profile?.username}</p>
      <p><strong>Email:</strong> {profile?.email}</p>
    </div>

    {/* Tabla de Compras */}
    <h3 className="text-white">Historial de Compras</h3>
    <DataTable
      columns={columns}
      data={purchasedProducts} // Datos de las compras realizadas
      pagination
    />


    {/* Modal para Evaluar Producto */}
    <Modal show={showEvaluateModal} onHide={() => handleSetShowEvaluateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Evaluar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct && (
          <>
            <h5>{selectedProduct.product_name}</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Puntuación</Form.Label>
                <Form.Control as="select">
                  <option value="5">5 - Excelente</option>
                  <option value="4">4 - Muy Bueno</option>
                  <option value="3">3 - Bueno</option>
                  <option value="2">2 - Regular</option>
                  <option value="1">1 - Malo</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Comentario</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Escribe tu opinión..." />
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleSetShowEvaluateModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => { /* Lógica para enviar evaluación */ }}>
          Enviar Evaluación
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}