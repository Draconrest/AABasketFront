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
  MenuItem,
  CircularProgress
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
  width: 500px;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 24px;
  padding: 16px;
  :focus {
    outline: none;
  }
`;

const UserModalForm = ({ modalType, open, handleClose, usuarioData, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    nombre: usuarioData?.nombre || '',
    tipo_afiliacion: usuarioData?.tipo_afiliacion || '',
    fecha_matricula: usuarioData?.fecha_matricula || '',
    valor_mensualidad: usuarioData?.valor_mensualidad || '',
    categoria: usuarioData?.categoria || '',
    telefono: usuarioData?.telefono || '',
    fecha_cumpleanos: usuarioData?.fecha_cumpleanos || '',
    activo: usuarioData?.activo || true
  });

  useEffect(() => {
    setFormData(usuarioData);
  }, [setFormData, usuarioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data a enviar', formData);
    onSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledStack spacing={3}>
        {modalType === 'create' ? <h2>Crear Usuario</h2> : <h2>Editar Usuario</h2>}
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" name="nombre" value={formData?.nombre || ''} onChange={handleChange} fullWidth margin="normal" />
          <Stack
            spacing={2}
            sx={{
              marginBottom: 2
            }}
          >
            <FormControl>
              <FormLabel id="affiliate-buttons-group-label">Tipo de Afiliación</FormLabel>
              <RadioGroup
                row
                aria-labelledby="affiliate-buttons-group-label"
                name="tipo_afiliacion"
                value={formData?.tipo_afiliacion || ''}
                onChange={handleChange}
              >
                <FormControlLabel value="Full" control={<Radio />} label="Full" />
                <FormControlLabel value="Ticket" control={<Radio />} label="Ticketera" />
                <FormControlLabel value="Becado" control={<Radio />} label="Becado" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="category-list-group-label">Categoría</FormLabel>
              <Select
                labelId="category-list-group-label"
                id="category-items-group"
                name="categoria"
                value={formData?.categoria || ''}
                onChange={handleChange}
              >
                <MenuItem value="iniciacion">Iniciación</MenuItem>
                <MenuItem value="Sub.10">Sub 10</MenuItem>
                <MenuItem value="Sub.13">Sub 13</MenuItem>
                <MenuItem value="May.mas">Mayores hombres</MenuItem>
                <MenuItem value="May.fem">Mayores mujeres</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Teléfono"
              name="telefono"
              value={formData?.telefono || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">+57</InputAdornment>
              }}
            />
            <DatePickerField
              label="Fecha de Matrícula"
              name="fecha_matricula"
              value={formData?.fecha_matricula || ''}
              setFieldValue={handleDateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Valor Mensualidad"
              name="valor_mensualidad"
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={formData?.valor_mensualidad || ''}
            />
            <DatePickerField
              label="Fecha de Nacimiento"
              name="fecha_cumpleanos"
              value={formData?.fecha_cumpleanos || ''}
              setFieldValue={handleDateChange}
              fullWidth
              margin="normal"
            />
          </Stack>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </form>
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
  isLoading: PropTypes.bool,
  onSave: PropTypes.func.isRequired
};
