import { memo, FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Badge, Box, Button, IconButton, Link, Menu, MenuItem, Toolbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { User } from 'src/models/user';
import { logout } from 'src/store/auth/slice';
import { selectIsAuthorized } from 'src/store/auth/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const AppHeaderComponent: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleUserLogout = () => {
    dispatch(logout());
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      
    </Menu>
  );

  const rightSection = isAuthorized ? (
    <>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          }}
          >
          <Badge badgeContent={0} color="error">
            <FontAwesomeIcon icon={faBell} />
          </Badge>
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Button
          color="inherit"
          onClick={handleUserLogout}
          sx={{ mx: 1 }}
          >
          Logout
        </Button>
        {renderMenu}
      </Box>
    </>
  ) : (
    <>
    <Button
      component={RouterLink}
      color="inherit"
      variant="outlined"
      to="login"
    >
      Login
    </Button>
    <Button
      sx={{marginLeft: '10px'}}
      component={RouterLink}
      color="inherit"
      variant="outlined"
      to="register"
    >
      Register
    </Button>
    </>
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
          Home
        </Link>
        <Link
          sx={{ marginLeft: 2 }}
          component={RouterLink}
          to="/group"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          Group
        </Link>
        <Link
          sx={{ marginLeft: 2 }}
          component={RouterLink}
          to="/presentation"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          Presentation
        </Link>
        <Link
          sx={{ marginLeft: 2 }}
          component={RouterLink}
          to="/profile"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          Profile
        </Link>
        <div />
        <Box sx={{ flexGrow: 1 }} />
        {rightSection}
      </Toolbar>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
