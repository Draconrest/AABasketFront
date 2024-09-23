import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const DatePickerField = ({ name, label, value, setFieldValue }) => {
  const handleChange = (date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setFieldValue(name, formattedDate); // Actualiza el valor en el formulario
  };

  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null} // Convierte la fecha a dayjs si está presente
      onChange={handleChange}
    />
  );
};

export default DatePickerField;

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired
};
