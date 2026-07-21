import { useMemo, useState } from 'react';
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Avatar, Box, Chip, Rating, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';
import { employees, statusColor, type Employee } from '../data/employees';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const columns: GridColDef<Employee>[] = [
  {
    field: 'name',
    headerName: 'Employee',
    flex: 1.4,
    minWidth: 220,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', height: '100%' }}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
          {params.row.name.split(' ').map((part) => part[0]).join('')}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {params.row.email}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  { field: 'role', headerName: 'Role', flex: 1, minWidth: 160 },
  { field: 'team', headerName: 'Team', width: 120 },
  { field: 'location', headerName: 'Location', width: 140 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        size="small"
        variant="outlined"
        label={params.row.status}
        color={statusColor[params.row.status]}
      />
    ),
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 120,
    valueFormatter: (value: number) => currency.format(value),
  },
  {
    field: 'performance',
    headerName: 'Rating',
    width: 150,
    renderCell: (params) => (
      <Rating value={params.row.performance} precision={0.5} size="small" readOnly />
    ),
  },
  {
    field: 'startDate',
    headerName: 'Start date',
    width: 120,
    type: 'date',
    valueGetter: (value: string) => new Date(value),
  },
];

type Density = 'compact' | 'standard' | 'comfortable';

export default function DataGridPage() {
  const [density, setDensity] = useState<Density>('standard');
  const [selection, setSelection] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  const selectedCount = selection.type === 'include'
    ? selection.ids.size
    : employees.length - selection.ids.size;

  const payroll = useMemo(
    () => employees.reduce((total, person) => total + person.salary, 0),
    [],
  );

  return (
    <Box>
      <PageHeader
        title="Data grid"
        subtitle={`${employees.length} rows with sorting, multi-column filtering, column visibility, pagination, quick search and CSV export — all from the free MIT DataGrid.`}
        action={
          <ToggleButtonGroup
            size="small"
            exclusive
            value={density}
            onChange={(_, value: Density | null) => value && setDensity(value)}
          >
            <ToggleButton value="compact">Compact</ToggleButton>
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="comfortable">Comfortable</ToggleButton>
          </ToggleButtonGroup>
        }
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Chip label={`${selectedCount} selected`} color={selectedCount ? 'primary' : 'default'} />
        <Chip variant="outlined" label={`Total payroll ${currency.format(payroll)}`} />
      </Stack>

      <Box sx={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          density={density}
          showToolbar
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selection}
          onRowSelectionModelChange={setSelection}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          sx={{ bgcolor: 'background.paper', '--DataGrid-overlayHeight': '300px' }}
        />
      </Box>
    </Box>
  );
}
