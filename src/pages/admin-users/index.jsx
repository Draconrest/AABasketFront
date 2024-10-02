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
import { useDeleteUser } from 'hooks/useDelete';
import { useUpdateUser } from 'hooks/useUpdate';
import { useAuth } from 'contexts/AuthContext';

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  width: 20%;
`;
const UsersAdminInfo = () => {
  const { token } = useAuth();
  const { data: usuarios, isLoading, isError, errorMessage, mutate } = useLazyUsers(token);
  const { createUser, isLoading: isCreating, error: createError } = useCreateUser();
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    const modifyUser = {
      ...usuario,
      telefono: usuario.telefono.slice(2)
    };
    setUsuarioSeleccionado(modifyUser);
    setModalEditarOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, token);
      setSnackbar({ open: true, message: 'Usuario eliminado exitosamente', severity: 'success' });
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al eliminar el usuario', severity: 'error' });
    }
  };

  const handleSave = async (userData) => {
    try {
      await updateUser(userData, token);
      setSnackbar({ open: true, message: 'Usuario actualizado exitosamente', severity: 'success' });
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: createError || 'Error al actualizar el usuario', severity: 'error' });
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData, token);
      setSnackbar({ open: true, message: 'Usuario creado exitosamente', severity: 'success' });
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: createError || 'Error al crear el usuario', severity: 'error' });
    }
  };

  //! Activar cuando se tenga la data de la API
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
