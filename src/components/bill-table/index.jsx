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
  styled,
  Button
} from '@mui/material';
import { CheckCircleOutlined, WhatsAppOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  width: 10%;
`;
const StyledTableCell = styled(TableCell)(({ theme, estado }) => ({
  backgroundColor: estado ? theme.palette.success?.lighter : 'inherit'
}));

// Estilo para la fila de títulos en el encabezado
const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& > *': {
    color: theme.palette.common.white
  }
}));

const BillsTable = ({ bills, onComplete }) => {
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

  const filteredBills = bills.filter((bill) => bill.nombre.toLowerCase().includes(filter.toLowerCase()));

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
              <TableCell>Fecha pago realizado</TableCell>
              <TableCell>Fecha de corte</TableCell>
              <TableCell>Valor Mensualidad</TableCell>
              <TableCell>Estado de pago</TableCell>
              <TableCell width={500} align="center">
                Acciones
              </TableCell>
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>
            {filteredBills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.nombre}</TableCell>
                <TableCell>{bill.fecha_pago}</TableCell>
                <TableCell>{bill.fecha_vencimiento}</TableCell>
                <TableCell>{`$ ${bill.monto}`}</TableCell>
                <StyledTableCell estado={bill.estado}>{bill.estado ? 'Pagado' : 'Pendiente'}</StyledTableCell>
                <TableCell>
                  <Box display="flex" flexDirection="row" gap={2} justifyContent={'center'}>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<CheckCircleOutlined />}
                      onClick={() => onComplete(bill)}
                      disabled={bill.estado}
                    >
                      Marcar como pagado
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<WhatsAppOutlined />}
                      onClick={() => onComplete(bill)}
                      disabled={true}
                    >
                      Enviar notificación
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filteredBills.length}
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

export default BillsTable;

BillsTable.propTypes = {
  bills: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};
