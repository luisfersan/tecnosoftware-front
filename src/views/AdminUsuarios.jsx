import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { users } from '../data/users';
import ModalAdminUser from '../components/ModalAdminUser';
import useTienda from '../hooks/useTienda';

export const AdminUsuarios = () => {

  const {getAllProfiles, allProfiles, updateUserById, deleteUserById} = useTienda()
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  getAllProfiles()
}, [])
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario con ID: ${id}?`
    );
    if (confirmDelete) {
      deleteUserById(id)
    }
  };

  const columnas = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      style: { textAlign: 'center'},
    },
    {
      name: 'Nombre',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Correo Electrónico',
      selector: (row) => row.email,
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
        title="Lista de Usuarios"
        columns={columnas}
        data={allProfiles.users}
        pagination
        paginationComponentOptions={paginacion}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        responsive
      />

      <ModalAdminUser
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        updateUserById={updateUserById}
      />
    </div>
  );
};
