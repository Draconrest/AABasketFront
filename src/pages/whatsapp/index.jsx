import SendWhatsappMessage from 'components/send-message';
import { Typography, Box } from '@mui/material';
import { Grid } from '@mui/material';
import background from 'assets/images/whatsapp/background.png';

const WhatsappServices = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '85vh',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Imagen de fondo */}
      <Box
        sx={{
          position: 'absolute', // Absoluta para estar detrás del contenido
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${background})`, // Reemplaza con la ruta de tu imagen
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3, // Reduce la visibilidad de la imagen
          filter: 'blur(2px)', // Difumina solo la imagen
          pointerEvents: 'none', // No clickeable
          zIndex: 1 // Mantiene la imagen detrás del contenido
        }}
      />

      {/* Contenido principal */}
      <Box
        sx={{
          position: 'relative', // Mantiene el contenido por encima de la imagen
          zIndex: 2, // Más alto que la imagen de fondo
          padding: '2rem'
        }}
      >
        <Typography variant="h2" sx={{ marginBottom: '1rem', color: '#325170', fontWeight: '500' }}>
          Servicios de Whatsapp
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SendWhatsappMessage
              title={'Enviar Notificación'}
              description={'Envía recordatorio via whatsapp a los usuarios próximos a vencer su fecha de pago.'}
              type={'notification'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SendWhatsappMessage
              title={'Enviar Mensaje Bienvenida'}
              description={'Envía mensaje de bienvenida a usuarios nuevos.'}
              type={'welcome'}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WhatsappServices;
