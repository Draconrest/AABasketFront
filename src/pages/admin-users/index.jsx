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

//! Cambiar por la data de la API
const users = [
  {
    nombre: 'Matias Gúzman',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.13',
    telefono: '300 5580823',
    activo: true
  },
  {
    nombre: 'Simón Arango',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.10',
    telefono: '315 4481259',
    activo: true
  },
  {
    nombre: 'Agustín Giraldo',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-13',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.10',
    telefono: '311 3838726',
    activo: true
  },
  {
    nombre: 'David Palacio',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-10',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.10',
    telefono: '311 3691693',
    activo: true
  },
  {
    nombre: 'Guadalupe Alzate',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-10',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.10',
    telefono: '312 7017800',
    activo: true
  },
  {
    nombre: 'Arthuro Rojas',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-04',
    valor_mensualidad: 100000.0,
    categoria: 'Sub.10',
    telefono: '304 3780137',
    activo: true
  },
  {
    nombre: 'Maximiliano Monsalve',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-02',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.13',
    telefono: '350 3342602',
    activo: true
  },
  {
    nombre: 'Maria Celeste Gomez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-09',
    valor_mensualidad: 50000.0,
    categoria: 'Sub.10',
    telefono: '305 3394669',
    activo: true
  },
  {
    nombre: 'María Antonia Uribe',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-07',
    valor_mensualidad: 100000.0,
    categoria: 'Sub.10',
    telefono: '304 6317056',
    activo: true
  },
  {
    nombre: 'Jacobo Lopera',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-23',
    valor_mensualidad: 150000.0,
    categoria: 'Iniciación',
    telefono: '300 6649004',
    activo: true
  },
  {
    nombre: 'Dante Alvarez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-20',
    valor_mensualidad: 100000.0,
    categoria: 'Iniciación',
    telefono: '301 3530034',
    activo: true
  },
  {
    nombre: 'Juan Manuel Castañeda',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-29',
    valor_mensualidad: 150000.0,
    categoria: 'Iniciación',
    telefono: '312 2145649',
    activo: true
  },
  {
    nombre: 'Juan Camilo Franco',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '310 4222423',
    activo: true
  },
  {
    nombre: 'Sergio Gúzman',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '300 5580823',
    activo: true
  },
  {
    nombre: 'Jhonny Aguirre',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '350 4612735',
    activo: true
  },
  {
    nombre: 'Cristian Vasquez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '314 6641559',
    activo: true
  },
  {
    nombre: 'Jhonny Lopez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '300 5588559',
    activo: true
  },
  {
    nombre: 'Alejandro Lopez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '300 2014277',
    activo: true
  },
  {
    nombre: 'Alejandro Valencia',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '314 7534038',
    activo: true
  },
  {
    nombre: 'Camilo Bedoya',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '319 2273133',
    activo: true
  },
  {
    nombre: 'Manuel Carvajal',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '300 5581728',
    activo: true
  },
  {
    nombre: 'Juan Camilo Roldan',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '300 6107335',
    activo: true
  },
  {
    nombre: 'Julian Rendón',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '310 4638025',
    activo: true
  },
  {
    nombre: 'Leonardo Madrigal',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '320 7818512',
    activo: true
  },
  {
    nombre: 'Manuel Ferraresi',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '320 2181923',
    activo: true
  },
  {
    nombre: 'Daiver Gúzman',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.mas',
    telefono: '314 4789880',
    activo: true
  },
  {
    nombre: 'Alejandro Hernandez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 50000.0,
    categoria: 'May.mas',
    telefono: '322 7354586',
    activo: true
  },
  {
    nombre: 'Vanessa Lopera',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.fem',
    telefono: '312 7017800',
    activo: true
  },
  {
    nombre: 'Karen Bastos',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.fem',
    telefono: '320 7302306',
    activo: true
  },
  {
    nombre: 'Katherin Zuluaga',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.fem',
    telefono: '311 3838726',
    activo: true
  },
  {
    nombre: 'Alexandra Grajales',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-01',
    valor_mensualidad: 70000.0,
    categoria: 'May.fem',
    telefono: '311 3691693',
    activo: true
  },
  {
    nombre: 'Tomas Arango Herrón',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-27',
    valor_mensualidad: 50000.0,
    categoria: 'Sub.10',
    telefono: '301 2546196',
    activo: true
  },
  {
    nombre: 'Matias Arango Herrón',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-08-27',
    valor_mensualidad: 50000.0,
    categoria: 'Sub.10',
    telefono: '301 2546196',
    activo: true
  },
  {
    nombre: 'Luciana Quintero',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-09',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.10',
    telefono: '301 3819246',
    activo: true
  },
  {
    nombre: 'María Paula Gutierrez',
    tipo_afiliacion: 'Full',
    fecha_matricula: '2024-09-17',
    valor_mensualidad: 150000.0,
    categoria: 'Sub.13',
    telefono: '318 8779633',
    activo: true
  }
];

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  width: 20%;
`;
const UsersAdminInfo = () => {
  const { data: usuarios, isLoading, isError, errorMessage, mutate } = useLazyUsers(null);
  const { createUser, isLoading: isCreating, error: createError } = useCreateUser();
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    setUsuarioSeleccionado(usuario);
    setModalEditarOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setSnackbar({ open: true, message: 'Usuario eliminado exitosamente', severity: 'success' });
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al eliminar el usuario', severity: 'error' });
    }
  };

  const handleSave = async (userData) => {
    try {
      await updateUser(userData);
      setSnackbar({ open: true, message: 'Usuario actualizado exitosamente', severity: 'success' });
      //mutate(); // Refrescar los datos de usuarios
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: createError || 'Error al actualizar el usuario', severity: 'error' });
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setSnackbar({ open: true, message: 'Usuario creado exitosamente', severity: 'success' });
      //mutate(); // Refrescar los datos de usuarios
      mutate();
    } catch (error) {
      setSnackbar({ open: true, message: createError || 'Error al crear el usuario', severity: 'error' });
    }
  };

  //! Activar cuando se tenga la data de la API
  //?if (isLoading) return <div>Loading...</div>;
  //?if (isError) return <div>Error: {errorMessage || 'Something went wrong'}</div>;
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Administrar Deportistas</Typography>
      <MainCard>
        <Stack spacing={2}>
          <StyledButton variant="contained" color="primary" startIcon={<PlusCircleOutlined />} onClick={() => setModalCrearOpen(true)}>
            Agregar deportista
          </StyledButton>
          <UsersTable usuarios={users} onEdit={handleEdit} onDelete={handleDelete} isError={isError} errorMessage={errorMessage} />
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
