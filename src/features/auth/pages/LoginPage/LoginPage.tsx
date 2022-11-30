import { memo, FC } from 'react';
import {
  Avatar, Box, Container, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { LoginForm } from '../../components/LoginForm';

import { GoogleLogin } from '@react-oauth/google';

import { AuthApi } from "src/api/services/auth-api"
import { useAppDispatch } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

// Template from MUI docs: https://mui.com/getting-started/templates/
const LoginPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <LoginForm />
      </Box>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          dispatch(AuthActions.loginGoogle(credentialResponse.credential ?? ''))
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        width="100%"
      />
      </div>
    </Container>
  );
}

export const LoginPage = memo(LoginPageComponent);
