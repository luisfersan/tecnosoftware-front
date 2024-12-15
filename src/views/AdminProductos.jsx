import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ModalAdminProduct from '../components/ModalAdminProduct';
import useTienda from '../hooks/useTienda';

export const AdminProductos = () => {
  const { allProducts, getAllProducts, updateProductById, deleteProductById } = useTienda();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProducts(); // Cargar productos al montar el componente
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirm) {
      await deleteProductById(id); // Llamar a la función del contexto
    }
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
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  console.log(allProducts.products)

  return (
    <div className="container my-5 py-5">
      <DataTable
        title="Lista de Productos"
        columns={columnas}
        data={allProducts.products}
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
        updateProductById={updateProductById}
      />
    </div>
  );
};
