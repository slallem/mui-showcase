import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';

const TEAMS = ['Platform', 'Design', 'Growth', 'Data', 'Support', 'Security'];
const SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Go', 'Rust', 'PostgreSQL', 'Figma',
  'Kubernetes', 'GraphQL', 'Python', 'Terraform',
];

const schema = z.object({
  fullName: z.string().min(2, 'Please enter at least 2 characters'),
  email: z.email('Enter a valid email address'),
  team: z.string().min(1, 'Pick a team'),
  employment: z.enum(['full-time', 'part-time', 'contract']),
  startDate: z
    .custom<Dayjs | null>()
    .refine((value) => value != null && value.isValid(), 'Pick a start date'),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  weeklyHours: z.number().min(4).max(40),
  remote: z.boolean(),
  notes: z.string().max(280, 'Keep it under 280 characters').optional(),
  terms: z.literal(true, { message: 'You must accept the policy' }),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  fullName: '',
  email: '',
  team: '',
  employment: 'full-time',
  startDate: null,
  skills: [],
  weeklyHours: 35,
  remote: true,
  notes: '',
  terms: true,
};

export default function FormPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, terms: false as true },
    mode: 'onTouched',
  });

  const onSubmit = async (values: FormValues) => {
    // Stand-in for a network request so the pending state is visible.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitted(values);
    setToastOpen(true);
  };

  return (
    <Box>
      <PageHeader
        title="Forms"
        subtitle="A realistic onboarding form: React Hook Form drives state, Zod validates, and every MUI control is wired through a Controller so errors and helper text behave consistently."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Section title="New teammate" description="All fields validate on blur, then on every change once touched.">
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full name"
                        fullWidth
                        required
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Work email"
                        type="email"
                        fullWidth
                        required
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="team"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Team"
                        fullWidth
                        required
                        error={!!errors.team}
                        helperText={errors.team?.message}
                      >
                        {TEAMS.map((team) => (
                          <MenuItem key={team} value={team}>
                            {team}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Start date"
                        minDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            error: !!errors.startDate,
                            helperText: errors.startDate?.message as string | undefined,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        options={SKILLS}
                        value={field.value}
                        onChange={(_, value) => field.onChange(value)}
                        onBlur={field.onBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Skills"
                            placeholder="Start typing…"
                            error={!!errors.skills}
                            helperText={errors.skills?.message ?? 'Type a value and press Enter to add your own'}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="employment"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={!!errors.employment}>
                        <FormLabel>Employment type</FormLabel>
                        <RadioGroup {...field} row>
                          <FormControlLabel value="full-time" control={<Radio size="small" />} label="Full-time" />
                          <FormControlLabel value="part-time" control={<Radio size="small" />} label="Part-time" />
                          <FormControlLabel value="contract" control={<Radio size="small" />} label="Contract" />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="weeklyHours"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel>Weekly hours: {field.value}</FormLabel>
                        <Slider
                          value={field.value}
                          onChange={(_, value) => field.onChange(value)}
                          min={4}
                          max={40}
                          step={1}
                          marks={[
                            { value: 4, label: '4' },
                            { value: 20, label: '20' },
                            { value: 40, label: '40' },
                          ]}
                          valueLabelDisplay="auto"
                        />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={3}
                        fullWidth
                        error={!!errors.notes}
                        helperText={errors.notes?.message ?? `${field.value?.length ?? 0}/280`}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="remote"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Primarily remote"
                      />
                    )}
                  />
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={!!errors.terms} component="fieldset" variant="standard">
                        <FormControlLabel
                          control={<Checkbox checked={field.value} onChange={field.onChange} />}
                          label="I accept the internal data policy"
                        />
                        {errors.terms && <FormHelperText>{errors.terms.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Stack direction="row" spacing={1.5}>
                    <Button type="submit" variant="contained" loading={isSubmitting}>
                      Create profile
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      disabled={!isDirty || isSubmitting}
                      onClick={() => {
                        reset();
                        setSubmitted(null);
                      }}
                    >
                      Reset
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Section title="Submitted payload" description="What the form hands to your API on success.">
            {submitted ? (
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                  fontSize: 13,
                  overflowX: 'auto',
                }}
              >
                {JSON.stringify(
                  { ...submitted, startDate: submitted.startDate?.format('YYYY-MM-DD') },
                  null,
                  2,
                )}
              </Box>
            ) : (
              <Typography color="text.secondary" variant="body2">
                Submit the form to see the validated values here.
              </Typography>
            )}
          </Section>
        </Grid>
      </Grid>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)}>
          Profile created successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
