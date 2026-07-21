import { Link as RouterLink } from 'react-router';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { navItems } from '../layout/navigation';
import { employees, statusColor } from '../data/employees';

const stats = [
  { label: 'Headcount', value: '180', delta: 4.2, hint: 'vs. last quarter' },
  { label: 'Open roles', value: '12', delta: -8.1, hint: 'vs. last quarter' },
  { label: 'Avg. tenure', value: '3.4y', delta: 1.6, hint: 'vs. last quarter' },
  { label: 'Offer accept rate', value: '82%', delta: 5.4, hint: 'vs. last quarter' },
];

const teamLoad = [
  { team: 'Platform', staffed: 92 },
  { team: 'Design', staffed: 74 },
  { team: 'Growth', staffed: 61 },
  { team: 'Data', staffed: 88 },
  { team: 'Security', staffed: 45 },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

export default function DashboardPage() {
  const recent = employees.slice(0, 5);

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="A composed page rather than a component gallery — cards, stats, lists and progress working together the way they would in a real product."
        action={
          <Button variant="contained" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/data-grid">
            Explore the data grid
          </Button>
        }
      />

      <Grid container spacing={3}>
        {stats.map(({ label, value, delta, hint }) => {
          const positive = delta > 0;
          return (
            <Grid key={label} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {label}
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {value}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip
                      size="small"
                      color={positive ? 'success' : 'warning'}
                      variant="outlined"
                      icon={positive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={`${positive ? '+' : ''}${delta}%`}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {hint}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        <Grid size={{ xs: 12, md: 7 }}>
          <Section title="Team staffing" description="Filled positions against approved headcount.">
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              {teamLoad.map(({ team, staffed }) => (
                <Box key={team}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {team}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {staffed}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={staffed}
                    color={staffed > 80 ? 'success' : staffed > 60 ? 'primary' : 'warning'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Section
            title="Recent joiners"
            description="The five most recent records."
            action={
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 13 } }}>
                {recent.map((person) => (
                  <Avatar key={person.id}>{initials(person.name)}</Avatar>
                ))}
              </AvatarGroup>
            }
          >
            <List disablePadding>
              {recent.map((person, index) => (
                <Box key={person.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem disableGutters secondaryAction={
                    <Chip
                      size="small"
                      label={person.status}
                      color={statusColor[person.status]}
                      variant="outlined"
                    />
                  }>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
                        {initials(person.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={person.name}
                      secondary={`${person.role} · ${person.team}`}
                      slotProps={{
                        primary: { variant: 'body2', sx: { fontWeight: 600 } },
                        secondary: { variant: 'caption' },
                      }}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Section>
        </Grid>

        {navItems.slice(1).map(({ label, path, icon: Icon, description }) => (
          <Grid key={path} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to={path} sx={{ height: '100%', p: 1 }}>
                <CardContent>
                  <Icon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
