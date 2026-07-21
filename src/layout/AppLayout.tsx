import { useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useColorScheme, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { navItems } from './navigation';

const DRAWER_WIDTH = 264;
const REPO_URL = 'https://github.com/slallem/mui-showcase';

function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  // `mode` is 'system' until the user picks one; resolve it for the icon.
  const resolved = mode === 'system' ? systemMode : mode;
  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <Tooltip title={`Switch to ${next} mode`}>
      <IconButton onClick={() => setMode(next)} color="inherit">
        {resolved === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

function DrawerContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.contrastText',
            bgcolor: 'primary.main',
            fontWeight: 700,
          }}
        >
          M
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
            MUI Showcase
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Components in situation
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {navItems.map(({ label, path, icon: Icon, description }) => (
          <ListItemButton
            key={path}
            component={RouterLink}
            to={path}
            selected={pathname === path}
            onClick={onNavigate}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={label}
              secondary={description}
              slotProps={{
                primary: { variant: 'body2', sx: { fontWeight: 600 } },
                secondary: { variant: 'caption', noWrap: true },
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Built with React, MUI and Vite.
        </Typography>
      </Box>
    </Box>
  );
}

export default function AppLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const current = navItems.find((item) => item.path === pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          bgcolor: 'rgba(from var(--mui-palette-background-paper) r g b / 0.75)',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' } }}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }} noWrap>
            {current?.label ?? 'MUI Showcase'}
          </Typography>
          <ColorModeToggle />
          <Tooltip title="View source">
            <IconButton component="a" href={REPO_URL} target="_blank" rel="noreferrer">
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
        >
          <DrawerContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          px: { xs: 2, md: 4 },
          pb: 6,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
