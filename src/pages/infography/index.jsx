import banner_left from 'assets/images/home/banner-left.webp';
import banner from 'assets/images/home/banner-top.webp';
import info from 'assets/images/home/infografia.webp';

import { Box, Grid } from '@mui/material';

const WelcomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 280px)', // Altura completa menos la barra de navegación (Toolbar)
        width: '100%'
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Columna izquierda: Banner vertical */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={banner_left}
            alt="Banner Vertical"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              pointerEvents: 'none'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <Box
              component="img"
              src={banner}
              alt="Banner Horizontal"
              sx={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                pointerEvents: 'none'
              }}
            />

            <Box
              component="img"
              src={info}
              alt="Infografía"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                pointerEvents: 'none',
                mt: 0 // Margen superior entre el banner horizontal y la infografía
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomePage;
