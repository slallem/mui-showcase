import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { employees, statusColor } from '../data/employees';

const steps = ['Offer sent', 'Contract signed', 'Equipment shipped', 'First day'];

const faqs = [
  {
    question: 'Why a plain Table instead of the DataGrid?',
    answer:
      'Table is the right choice for small, static datasets where you control the markup. Reach for the DataGrid once you need sorting, filtering, virtualization or pagination.',
  },
  {
    question: 'How is dark mode handled?',
    answer:
      'The theme declares both color schemes and MUI emits CSS variables for each. Toggling swaps a data attribute on the html element, so no React re-render cascade is needed.',
  },
  {
    question: 'Is any of this data real?',
    answer:
      'No. All 180 employee records are generated at runtime from a seeded pseudo-random generator, so the demo looks identical on every reload.',
  },
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export default function DataDisplayPage() {
  const [tab, setTab] = useState(0);
  const rows = employees.slice(0, 6);

  return (
    <Box>
      <Breadcrumbs sx={{ pt: 3 }}>
        <Link underline="hover" color="inherit" href="#">
          Showcase
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Components
        </Link>
        <Typography color="text.primary">Data display</Typography>
      </Breadcrumbs>

      <PageHeader
        title="Data display"
        subtitle="Tables, lists, tabs, steppers and accordions — the components that carry content rather than collect it."
      />

      <Grid container spacing={3}>
        <Grid size={12}>
          <Section title="Table" description="Semantic markup, right-aligned numerics and hover states.">
            <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((person) => (
                    <TableRow key={person.id} hover>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {person.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {person.role}
                        </Typography>
                      </TableCell>
                      <TableCell>{person.team}</TableCell>
                      <TableCell>{person.location}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="outlined"
                          label={person.status}
                          color={statusColor[person.status]}
                        />
                      </TableCell>
                      <TableCell align="right">{currency.format(person.salary)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Section title="Tabs" description="Panels sharing one region of the page.">
            <Box sx={{ mt: 1 }}>
              <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
                <Tab label="Overview" />
                <Tab label="Directory" />
                <Tab label="Activity" />
              </Tabs>
              <Divider />
              <Box sx={{ pt: 2.5, minHeight: 220 }}>
                {tab === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Tabs keep related views one click apart without a route change. Keep the
                    label count low and the labels short — if you need more than five, a nav
                    list or a select is usually the better shape.
                  </Typography>
                )}
                {tab === 1 && (
                  <List disablePadding>
                    {rows.slice(0, 4).map((person) => (
                      <ListItem key={person.id} disableGutters>
                        <ListItemAvatar>
                          <Avatar sx={{ width: 34, height: 34, fontSize: 14 }}>
                            {person.name.split(' ').map((part) => part[0]).join('')}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={person.name}
                          secondary={`${person.role} · ${person.location}`}
                          slotProps={{
                            primary: { variant: 'body2', sx: { fontWeight: 600 } },
                            secondary: { variant: 'caption' },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                {tab === 2 && (
                  <Stack spacing={1.5}>
                    {[
                      'Amara Okafor moved to Platform',
                      'Contract signed by Dev Patel',
                      'Offer approved for the Security team',
                      'Quarterly review exported to CSV',
                    ].map((entry) => (
                      <Stack key={entry} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                        <Typography variant="body2">{entry}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Section title="Stepper" description="Progress through a known sequence.">
            <Stepper activeStep={2} orientation="vertical" sx={{ mt: 1 }}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Section>
        </Grid>

        <Grid size={12}>
          <Section title="Accordion" description="Progressive disclosure for secondary detail.">
            <Box sx={{ mt: 1 }}>
              {faqs.map(({ question, answer }) => (
                <Accordion key={question} disableGutters elevation={0} sx={{ border: 1, borderColor: 'divider', '&:not(:last-child)': { borderBottom: 0 } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
}
