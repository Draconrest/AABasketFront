import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextField,
  Button,
  styled,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from '@mui/material';
import DatePickerField from 'components/date-picker';
import InputAdornment from '@mui/material/InputAdornment';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
const StyledStack = styled(Stack)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 24px;
  padding: 16px;
  :focus {
    outline: none;
  }
`;

const UserModalForm = ({ modalType, open, handleClose, usuarioData, onSave }) => {
  const [usuario, setUsuario] = useState(usuarioData || {});

  useEffect(() => {
    setUsuario(usuarioData);
  }, [usuarioData]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  //!Modificar para usar el endpoint de la API
  const handleSubmit = () => {
    onSave(usuario);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledStack spacing={3}>
        {modalType === 'create' ? <h2>Crear Usuario</h2> : <h2>Editar Usuario</h2>}
        <TextField label="Nombre" name="nombre" value={usuario?.nombre || ''} onChange={handleChange} fullWidth margin="normal" />
        <FormControl>
          <FormLabel id="affiliate-buttons-group-label">Tipo de Afiliación</FormLabel>
          <RadioGroup row aria-labelledby="affiliate-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel value="full" control={<Radio />} label="Full" />
            <FormControlLabel value="ticket" control={<Radio />} label="Ticket" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="category-list-group-label">Categoría</FormLabel>
          <Select
            labelId="category-list-group-label"
            id="category-items-group"
            name="categoria"
            value={usuario?.categoria || ''}
            onChange={handleChange}
          >
            <MenuItem value="iniciacion">Iniciación</MenuItem>
            <MenuItem value="Sub.10">Sub 10</MenuItem>
            <MenuItem value="Sub.13">Sub 13</MenuItem>
            <MenuItem value="May.Mas">Mayores hombres</MenuItem>
            <MenuItem value="May.Fem">Mayores mujeres</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Teléfono"
          name="telefono"
          value={usuario?.telefono || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">+57</InputAdornment>
          }}
        />
        <DatePickerField
          label="Fecha de Matrícula"
          name="fechaMatricula"
          value={usuario?.fechaMatricula || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Valor Mensualidad"
          name="valorMensualidad"
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          value={usuario?.valorMensualidad || ''}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </StyledStack>
    </Modal>
  );
};

export default UserModalForm;

UserModalForm.propTypes = {
  modalType: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  usuarioData: PropTypes.object,
  onSave: PropTypes.func.isRequired
};
