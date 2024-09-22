import React, { useState } from 'react';
import UsersTable from 'components/users-table';
import UserModalForm from 'components/user-form';
import { CreateUserModal } from 'components/create-user';
import { Button, Stack, styled, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { PlusCircleOutlined } from '@ant-design/icons';
//import { useLazyUsers } from 'api/useUsers';

const usuariosMock = [
  {
    id: 1,
    nombre: 'Carlos López',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-01-10',
    valorMensualidad: 50,
    categoria: 'Junior',
    telefono: '3124567890'
  },
  {
    id: 2,
    nombre: 'Ana Martínez',
    tipoAfiliacion: 'Premium',
    fechaMatricula: '2022-12-01',
    valorMensualidad: 70,
    categoria: 'Senior',
    telefono: '3157896543'
  },
  {
    id: 3,
    nombre: 'Luis Rodríguez',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-03-15',
    valorMensualidad: 50,
    categoria: 'Juvenil',
    telefono: '3101234567'
  },
  {
    id: 4,
    nombre: 'Carlos López',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-01-10',
    valorMensualidad: 50,
    categoria: 'Junior',
    telefono: '3124567890'
  },
  {
    id: 5,
    nombre: 'Ana Martínez',
    tipoAfiliacion: 'Premium',
    fechaMatricula: '2022-12-01',
    valorMensualidad: 70,
    categoria: 'Senior',
    telefono: '3157896543'
  },
  {
    id: 6,
    nombre: 'Luis Rodríguez',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-03-15',
    valorMensualidad: 50,
    categoria: 'Juvenil',
    telefono: '3101234567'
  },
  {
    id: 7,
    nombre: 'Carlos López',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-01-10',
    valorMensualidad: 50,
    categoria: 'Junior',
    telefono: '3124567890'
  },
  {
    id: 8,
    nombre: 'Ana Martínez',
    tipoAfiliacion: 'Premium',
    fechaMatricula: '2022-12-01',
    valorMensualidad: 70,
    categoria: 'Senior',
    telefono: '3157896543'
  },
  {
    id: 9,
    nombre: 'Luis Rodríguez',
    tipoAfiliacion: 'Regular',
    fechaMatricula: '2023-03-15',
    valorMensualidad: 50,
    categoria: 'Juvenil',
    telefono: '3101234567'
  }
];

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  width: 8%;
`;
const UsersAdminInfo = () => {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalCrearOpen, setModalCrearOpen] = useState(false);

  //?Activar cuando se tenga el endpoint de la API
  /* //!request para obtener los usuarios
  const { data, isLoading, isError, errorMessage } = useLazyUsers({ page: 1, limit: 10 });
  console.log(data); */
  //!Fin request para obtener los usuarios
  /* if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {errorMessage || 'Something went wrong'}</div>; */
  //?Fin activar cuando se tenga el endpoint de la API

  //!Modificar para usar el endpoint de la API
  const handleEdit = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    setUsuarioSeleccionado(usuario);
    setModalEditarOpen(true);
  };

  //!Modificar para usar el endpoint de la API
  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  //!Modificar para usar el endpoint de la API
  const handleSave = (usuarioEditado) => {
    setUsuarios(usuarios.map((u) => (u.id === usuarioEditado.id ? usuarioEditado : u)));
  };

  //!Modificar para usar el endpoint de la API
  const handleCreate = (nuevoUsuario) => {
    nuevoUsuario.id = usuarios.length + 1; // Simular un ID único
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Administrar Deportistas</Typography>
      <MainCard>
        <Stack spacing={2}>
          <StyledButton variant="contained" color="primary" startIcon={<PlusCircleOutlined />} onClick={() => setModalCrearOpen(true)}>
            Agregar deportista
          </StyledButton>
          <UsersTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
          <UserModalForm
            modalType={'edit'}
            open={modalEditarOpen}
            handleClose={() => setModalEditarOpen(false)}
            usuarioData={usuarioSeleccionado}
            onSave={handleSave}
          />
          <CreateUserModal modalType={'create'} open={modalCrearOpen} handleClose={() => setModalCrearOpen(false)} onSave={handleCreate} />
        </Stack>
      </MainCard>
    </Stack>
  );
};

export default UsersAdminInfo;
