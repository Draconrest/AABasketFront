import { Typography, Button, Box, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import welcome from 'assets/images/whatsapp/welcome.jpeg';
import notification from 'assets/images/whatsapp/notification.png';
//import { useTheme } from '@mui/material/styles';

const SendWhatsappMessage = ({ title, description, onSave, type }) => {
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
          <Button variant="contained" onClick={onSave}>
            Enviar
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
