import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function Section({ title, description, action, children }: SectionProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        subheader={description}
        action={action}
        slotProps={{
          title: { variant: 'h6' },
          subheader: { variant: 'body2' },
        }}
      />
      <CardContent sx={{ pt: 0 }}>{children}</CardContent>
    </Card>
  );
}
