import DashboardIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TableIcon from '@mui/icons-material/TableChartOutlined';
import FormIcon from '@mui/icons-material/EditNoteOutlined';
import InputsIcon from '@mui/icons-material/TuneOutlined';
import FeedbackIcon from '@mui/icons-material/NotificationsActiveOutlined';
import DisplayIcon from '@mui/icons-material/ViewQuiltOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  label: string;
  path: string;
  icon: SvgIconComponent;
  description: string;
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardIcon,
    description: 'Cards, stats and layout composition',
  },
  {
    label: 'Data grid',
    path: '/data-grid',
    icon: TableIcon,
    description: 'Sorting, filtering, pagination and custom cells',
  },
  {
    label: 'Forms',
    path: '/forms',
    icon: FormIcon,
    description: 'Validation with React Hook Form and Zod',
  },
  {
    label: 'Inputs',
    path: '/inputs',
    icon: InputsIcon,
    description: 'Every input control in its natural habitat',
  },
  {
    label: 'Feedback',
    path: '/feedback',
    icon: FeedbackIcon,
    description: 'Dialogs, snackbars, progress and skeletons',
  },
  {
    label: 'Data display',
    path: '/data-display',
    icon: DisplayIcon,
    description: 'Tables, lists, timelines and typography',
  },
];
