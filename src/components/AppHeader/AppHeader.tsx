import { memo, FC, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Badge, Box, Button, CircularProgress, IconButton, Link, Menu, MenuItem, Toolbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { User } from 'src/models/user';
import { logout } from 'src/store/auth/slice';
import { selectIsAuthorized } from 'src/store/auth/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { selectIsNotificationLoading, selectNotifications } from 'src/store/notification/selectors';
import { NotificationsActions } from 'src/store/notification/dispatchers';
import { Notification } from './Notification/Notification';
import style from "./AppHeader.module.css";
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { io, Socket } from 'socket.io-client';
import { UserActions } from 'src/store/profile/dispatchers';
import { selectProfile } from 'src/store/profile/selectors';

const AppHeaderComponent: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
    const [ socket, setSocket ] = useState<Socket>();
    const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { setLastElement } = useInfiniteScroll(() => {
    dispatch(NotificationsActions.fetchMoreNotifications())
  });
  
  useEffect(() => {
    dispatch(NotificationsActions.fetchNotifications());
    dispatch(UserActions.fetchProfile());
  }, [])
  useEffect(() => {
    setSocket(io('http://localhost:8080/',  {transports: ['websocket']}))
}, [])
  const profile = useAppSelector(selectProfile);
  useEffect(() => {
    if (profile && socket) {
      socket.emit("AddUser", profile.id)
    }
  }, [socket, profile])
  useEffect(() => {
    socket?.on("Notify", message => {
      console.log(message)
      dispatch(NotificationsActions.fetchNotifications())
      dispatch(UserActions.fetchProfile())
    })
  }, [socket])
  const notifications = useAppSelector(selectNotifications);
  const isNotificationLoading = useAppSelector(selectIsNotificationLoading);
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
      <div className={style['notifications']}>
        {notifications.length === 0 && !isNotificationLoading && <i className={style['notifications__empty']}>Empty!</i>}
        {notifications.map((notification, index) => {
          if (index === notifications.length - 1) {
            return <Notification key={notification.id} notification={notification} ref={setLastElement} />;
          }
          return <Notification key={notification.id} notification={notification} />;
        })}
        {isNotificationLoading && <div className={style['circle']}><CircularProgress size={25}/></div>}
      </div>
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
