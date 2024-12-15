import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { products } from '../data/products';
import ModalAdminProduct from '../components/ModalAdminProduct';

export const AdminProductos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    alert(`Eliminar producto con ID: ${id}`);
  };

  const columnas = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      style: { textAlign: 'center', maxWidth: '80px' },
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: (row) => row.description,
      sortable: true,
      style: { maxWidth: '400px' },
    },
    {
      name: 'Precio',
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="btn-group">
          <button
            onClick={() => handleEdit(row)}
            className="btn btn-primary btn-sm"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      style: { minWidth: '150px', overflow: 'visible' },
    },
  ];

  const paginacion = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <div className="container my-5 py-5">
      <DataTable
        title="Lista de productos"
        columns={columnas}
        data={products.data.products}
        pagination
        paginationComponentOptions={paginacion}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        responsive
      />

      <ModalAdminProduct
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};
