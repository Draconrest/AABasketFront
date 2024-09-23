//! React hooks
import React, { useState } from 'react';
//! Components
import UsersTable from 'components/users-table';
import UserModalForm from 'components/user-form';
import { CreateUserModal } from 'components/create-user';
//! Material UI
import { Button, Stack, styled, Typography, Snackbar, Alert } from '@mui/material';
import MainCard from 'components/MainCard';
import { PlusCircleOutlined } from '@ant-design/icons';
//! API
import { useLazyUsers } from 'api/useUsers';
import { useCreateUser } from 'hooks/usePost';

/* const usuariosMock = [
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
]; */

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  width: 8%;
`;
const UsersAdminInfo = () => {
  const { data: usuarios, isLoading, isError, errorMessage, mutate } = useLazyUsers(null);
  const { createUser, isLoading: isCreating, /* isError: isCreateError */ error: createError } = useCreateUser();
  //const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  //!Modificar para usar el endpoint de la API
  const handleEdit = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    console.log('Usuario seleccionado', usuario);
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
  /*  const handleCreate = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  }; */

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setSnackbar({ open: true, message: 'Usuario creado exitosamente', severity: 'success' });
      //setModalOpen(false);
      mutate(); // Refrescar los datos de usuarios
    } catch (error) {
      setSnackbar({ open: true, message: createError || 'Error al crear el usuario', severity: 'error' });
      console.log('Error al crear el usuario', createError);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {errorMessage || 'Something went wrong'}</div>;
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Administrar Deportistas</Typography>
      <MainCard>
        <Stack spacing={2}>
          <StyledButton variant="contained" color="primary" startIcon={<PlusCircleOutlined />} onClick={() => setModalCrearOpen(true)}>
            Agregar deportista
          </StyledButton>
          <UsersTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} isError={isError} errorMessage={errorMessage} />
          <UserModalForm
            modalType={'edit'}
            open={modalEditarOpen}
            handleClose={() => setModalEditarOpen(false)}
            usuarioData={usuarioSeleccionado}
            onSave={handleSave}
          />
          <CreateUserModal
            modalType={'create'}
            open={modalCrearOpen}
            handleClose={() => setModalCrearOpen(false)}
            isLoading={isCreating}
            onSave={handleCreateUser}
          />
          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </MainCard>
    </Stack>
  );
};

export default UsersAdminInfo;
