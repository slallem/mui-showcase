import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Fab,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Rating,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';

export default function InputsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formats, setFormats] = useState<string[]>(['bold']);
  const [range, setRange] = useState<number[]>([25, 75]);
  const [tags, setTags] = useState(['design', 'accessibility', 'motion']);
  const [rating, setRating] = useState<number | null>(4);

  return (
    <Box>
      <PageHeader
        title="Inputs"
        subtitle="Buttons, text fields, toggles and selection controls across their variants, sizes and states — including disabled and error cases that are easy to forget."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Buttons" description="Variants, colors, sizes and the built-in loading state.">
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="contained" color="error">
                  Danger
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
              </Stack>

              <Stack direction="row" spacing={1.5} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Button size="small" variant="outlined">
                  Small
                </Button>
                <Button size="medium" variant="outlined">
                  Medium
                </Button>
                <Button size="large" variant="outlined">
                  Large
                </Button>
                <Button variant="contained" loading>
                  Saving
                </Button>
                <Button variant="outlined" loading loadingPosition="start" startIcon={<AddIcon />}>
                  Adding
                </Button>
              </Stack>

              <Stack direction="row" spacing={1.5} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <ButtonGroup variant="outlined">
                  <Button>Day</Button>
                  <Button>Week</Button>
                  <Button>Month</Button>
                </ButtonGroup>
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
                <Fab variant="extended" size="small" color="secondary">
                  <AddIcon sx={{ mr: 1 }} />
                  Extended
                </Fab>
              </Stack>
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Text fields" description="Variants, adornments, and validation states.">
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <TextField label="Outlined" defaultValue="Default" fullWidth />
                <TextField label="Filled" variant="filled" defaultValue="Default" fullWidth />
                <TextField label="Standard" variant="standard" defaultValue="Default" fullWidth />
              </Stack>

              <TextField
                label="Search"
                placeholder="Find anything…"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                defaultValue="correct-horse-battery"
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword((visible) => !visible)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Stack direction="row" spacing={2}>
                <TextField label="Error" error helperText="This field is required" fullWidth />
                <TextField label="Disabled" disabled defaultValue="Read only" fullWidth />
              </Stack>
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Selection & toggles" description="Switches, toggle buttons and ratings.">
            <Stack spacing={3} sx={{ mt: 1 }}>
              <ToggleButtonGroup
                value={formats}
                onChange={(_, value: string[]) => setFormats(value)}
                aria-label="Text formatting"
              >
                <ToggleButton value="bold" aria-label="Bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="Italic">
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="Underlined">
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
                <FormControlLabel control={<Switch defaultChecked />} label="Email alerts" />
                <FormControlLabel control={<Switch />} label="SMS alerts" />
                <FormControlLabel control={<Switch disabled defaultChecked />} label="Locked" />
              </Stack>

              <Box>
                <Typography variant="body2" gutterBottom>
                  Satisfaction — {rating ?? 'not rated'}
                </Typography>
                <Rating value={rating} onChange={(_, value) => setRating(value)} precision={0.5} />
              </Box>
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Sliders & chips" description="Range selection and removable chips.">
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Box sx={{ px: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Salary band — {range[0]}k to {range[1]}k
                </Typography>
                <Slider
                  value={range}
                  onChange={(_, value) => setRange(value as number[])}
                  valueLabelDisplay="auto"
                  disableSwap
                />
              </Box>

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => setTags((current) => current.filter((item) => item !== tag))}
                  />
                ))}
                <Chip
                  icon={<AddIcon />}
                  label="Add tag"
                  variant="outlined"
                  onClick={() => setTags((current) => [...current, `tag-${current.length + 1}`])}
                />
              </Stack>

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Success" color="success" variant="outlined" />
                <Chip label="Warning" color="warning" variant="outlined" />
                <Chip label="Error" color="error" size="small" />
              </Stack>
            </Stack>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
}
