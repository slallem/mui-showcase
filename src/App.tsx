import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Box, LinearProgress } from '@mui/material';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';

// Route-level code splitting keeps the initial bundle to the shell + dashboard.
const DataGridPage = lazy(() => import('./pages/DataGridPage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const InputsPage = lazy(() => import('./pages/InputsPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const DataDisplayPage = lazy(() => import('./pages/DataDisplayPage'));

function RouteFallback() {
  return (
    <Box sx={{ pt: 6 }}>
      <LinearProgress />
    </Box>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="data-grid" element={<DataGridPage />} />
          <Route path="forms" element={<FormPage />} />
          <Route path="inputs" element={<InputsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="data-display" element={<DataDisplayPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
