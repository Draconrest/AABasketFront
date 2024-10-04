import { Typography, Stack, Snackbar, Alert, Button } from '@mui/material';
import BillsTable from 'components/bill-table';
import { useLazyBills } from 'api/useBills';
import { useConfirmeBill } from 'hooks/useConfirmeBill';
import { useCreatePayments } from 'hooks/usePayments';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';

const BillingMain = () => {
  const { token } = useAuth();
  const { data: bills, isLoading, isError, errorMessage, mutate } = useLazyBills(token);
  const { createPayment, isLoading: loadingPayment } = useCreatePayments();
  const { confirmeBill } = useConfirmeBill();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const onComplete = async (billData) => {
    try {
      await confirmeBill(billData, token);
      await mutate();
      setSnackbar({ open: true, message: 'Pago confirmado correctamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const handleCreatePayment = async () => {
    try {
      await createPayment(token);
      await mutate();
      setSnackbar({ open: true, message: 'Pagos creados exitosamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al crear pagos', severity: 'error' });
    }
  };

  if (isLoading || loadingPayment) return <div>Loading...</div>;
  if (isError) return <div>Error: {errorMessage || 'Something went wrong'}</div>;

  return (
    <Stack spacing={2}>
      <Typography variant="h2" sx={{ marginBottom: '1rem', color: '#325170', fontWeight: 'bold' }}>
        Servicios de Facturación
      </Typography>
      <MainCard>
        <Stack marginBottom={'1rem'} direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Facturas
          </Typography>
          <Button variant="contained" onClick={handleCreatePayment} disabled={loadingPayment}>
            Crear facturas
          </Button>
        </Stack>
        <Stack spacing={2}>
          <BillsTable bills={bills} onComplete={onComplete} />
          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </MainCard>
    </Stack>
  );
};

export default BillingMain;
