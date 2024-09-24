import { Typography, Button, Box, Grid, CircularProgress } from '@mui/material';
import MainCard from 'components/MainCard';
import welcome from 'assets/images/whatsapp/welcome.webp';
import notification from 'assets/images/whatsapp/notification.webp';
import PropTypes from 'prop-types';
//import { useTheme } from '@mui/material/styles';

const SendWhatsappMessage = ({ title, description, onSave, type, isLoading }) => {
  //const theme = useTheme();
  //const titleColor = theme.palette.secondaryAA.main;
  const isWelcome = type === 'welcome';
  const isNotification = type === 'notification';
  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ marginBottom: '1rem', color: '#325170' }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: '2rem' }}>
            {description}
          </Typography>
          <Button variant="contained" onClick={onSave} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Vista previa</Typography>
          {isWelcome && (
            <Box
              component="img"
              src={welcome}
              alt="Mensaje de Bienvenida"
              sx={{
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                pointerEvents: 'none'
              }}
            />
          )}

          {isNotification && (
            <Box
              component="img"
              src={notification}
              alt="Mensaje de Notificación"
              sx={{
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                pointerEvents: 'none'
              }}
            />
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SendWhatsappMessage;

SendWhatsappMessage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['welcome', 'notification']).isRequired,
  isLoading: PropTypes.bool
};
