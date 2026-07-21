import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between', py: 4 }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
          {subtitle}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
}
