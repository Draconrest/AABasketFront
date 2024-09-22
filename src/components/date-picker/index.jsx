//import { useField, useFormikContext } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const DatePickerField = ({ name, label }) => {
  //const { setFieldValue } = useFormikContext();
  //const [field] = useField(name);

  const handleChange = (date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setFieldValue(name, formattedDate);
  };

  return <DatePicker label={label} /* value={field.value ? dayjs(field.value) : null} */ onChange={handleChange} />;
};

export default DatePickerField;
