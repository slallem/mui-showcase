import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  LinearProgress,
  MenuItem,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MailIcon from '@mui/icons-material/MailOutlined';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';

type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export default function FeedbackPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [toast, setToast] = useState<{ severity: ToastSeverity; message: string } | null>(null);
  const [loadingCard, setLoadingCard] = useState(true);

  const showBackdrop = () => {
    setBackdropOpen(true);
    setTimeout(() => setBackdropOpen(false), 1500);
  };

  return (
    <Box>
      <PageHeader
        title="Feedback"
        subtitle="How the app talks back: confirmation dialogs, transient toasts, inline alerts, loading placeholders and blocking overlays."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Alerts" description="Inline, persistent messaging with four severities.">
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="success">Deployment finished in 42 seconds.</Alert>
              <Alert severity="info" variant="outlined">
                A new version of the design system is available.
              </Alert>
              <Alert severity="warning" variant="filled">
                Your API key expires in 3 days.
              </Alert>
              <Alert severity="error" onClose={() => {}}>
                <AlertTitle>Import failed</AlertTitle>
                Rows 12–18 were rejected because the email column was empty.
              </Alert>
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Overlays" description="Dialogs, drawers and blocking backdrops.">
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 1 }}>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>
                Confirm dialog
              </Button>
              <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
                Side drawer
              </Button>
              <Button variant="outlined" onClick={showBackdrop}>
                Backdrop
              </Button>
              <Tooltip title="Tooltips explain an action without stealing focus" arrow>
                <Button variant="text">Hover me</Button>
              </Tooltip>
              <Badge badgeContent={7} color="error">
                <MailIcon />
              </Badge>
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Snackbars" description="Transient confirmation anchored to the viewport.">
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 1 }}>
              {(['success', 'info', 'warning', 'error'] as ToastSeverity[]).map((severity) => (
                <Button
                  key={severity}
                  variant="outlined"
                  color={severity}
                  onClick={() => setToast({ severity, message: `This is a ${severity} message` })}
                >
                  {severity}
                </Button>
              ))}
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section
            title="Progress & skeletons"
            description="Prefer skeletons for first loads, spinners for actions."
            action={
              <Button size="small" onClick={() => setLoadingCard((loading) => !loading)}>
                {loadingCard ? 'Show content' : 'Show skeleton'}
              </Button>
            }
          >
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <CircularProgress size={28} />
                <CircularProgress size={28} variant="determinate" value={68} />
                <Box sx={{ flex: 1 }}>
                  <LinearProgress sx={{ mb: 1.5, borderRadius: 4 }} />
                  <LinearProgress variant="determinate" value={68} sx={{ borderRadius: 4 }} />
                </Box>
              </Stack>

              {loadingCard ? (
                <Box>
                  <Skeleton variant="text" width="60%" height={28} />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="rounded" height={72} sx={{ mt: 1 }} />
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Quarterly review
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Headcount grew 4.2% while attrition held steady at 6%. Platform and Data
                    absorbed most of the new hires.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Section>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Archive this employee?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Their profile becomes read-only and they lose access to internal tools. You can
            restore the record within 30 days.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDialogOpen(false);
              setToast({ severity: 'success', message: 'Employee archived' });
            }}
          >
            Archive
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: { xs: 300, sm: 380 }, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Drawers keep secondary controls out of the main flow without a full page change.
          </Typography>
          <Stack spacing={2}>
            <TextField label="Keyword" fullWidth />
            <TextField label="Team" select fullWidth defaultValue="Platform">
              {['Platform', 'Design', 'Growth', 'Data'].map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={() => setDrawerOpen(false)}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <Backdrop open={backdropOpen} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={!!toast}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
