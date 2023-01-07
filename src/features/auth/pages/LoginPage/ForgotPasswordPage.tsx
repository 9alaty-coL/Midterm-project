import { memo, FC } from 'react';
import {
  Avatar, Box, Container, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { LoginForm } from '../../components/LoginForm';

import { GoogleLogin } from '@react-oauth/google';

import { useAppDispatch } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/LoginForm';

const ForgotPasswordPageComponent: FC = () => {
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
          Forgot Password
        </Typography>
        <ForgotPasswordForm />
      </Box>
    </Container>
  );
}

export const ForgotPasswordPage = memo(ForgotPasswordPageComponent);
