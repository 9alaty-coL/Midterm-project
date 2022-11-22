import { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Box, Button, Link, Toolbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { User } from 'src/models/user';
import { logout } from 'src/store/auth/slice';
import { selectIsAuthorized } from 'src/store/auth/selectors';

const AppHeaderComponent: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(logout());
  };

  const rightSection = isAuthorized ? (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <Button
        color="inherit"
        onClick={handleUserLogout}
        sx={{ mx: 1 }}
      >
        Logout
      </Button>
    </Box>
  ) : (
    <Button
      component={RouterLink}
      color="inherit"
      variant="outlined"
      to="login"
    >
      Login
    </Button>
  );

  return (
    <AppBar position="relative">
      <Toolbar>
        {/* Read more about routing in MUI here: https://mui.com/guides/routing/ */}
        <Link
          component={RouterLink}
          to="/"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          React Boilerplate
        </Link>
        <div />
        <Box sx={{ flexGrow: 1 }} />
        {rightSection}
      </Toolbar>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
