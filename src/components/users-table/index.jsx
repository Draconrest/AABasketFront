import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  TableFooter,
  IconButton,
  styled
} from '@mui/material';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  width: 10%;
`;
const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& > *': {
    color: theme.palette.common.white
  }
}));

const UsersTable = ({ usuarios, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) => usuario.nombre.toLowerCase().includes(filter.toLowerCase()));

  return (
    <MainCard>
      <StyledTextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo de Afiliación</TableCell>
              <TableCell>Fecha de Matrícula</TableCell>
              <TableCell>Valor Mensualidad</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha Nacimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>
            {filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.tipo_afiliacion}</TableCell>
                <TableCell>{usuario.fecha_matricula}</TableCell>
                <TableCell>{`$ ${usuario.valor_mensualidad.toLocaleString('es-CO')}`}</TableCell>
                <TableCell>{usuario.categoria}</TableCell>
                <TableCell>{usuario.telefono.slice(2)}</TableCell>
                <TableCell>{usuario.fecha_cumpleanos}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(usuario.id)} color="success">
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => onDelete(usuario.id)} color="error">
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filteredUsuarios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default UsersTable;

UsersTable.propTypes = {
  usuarios: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
