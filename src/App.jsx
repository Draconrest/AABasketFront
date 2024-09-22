import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ScrollTop from 'components/ScrollTop';
//!import { AuthProvider } from "contexts/AuthContext";

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <AuthProvider> */}
          <RouterProvider router={router} />
          {/* </AuthProvider> */}
        </LocalizationProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
