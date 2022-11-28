import { memo, FC } from 'react';
import {
  Avatar, Box, Container, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { RegisterForm } from '../../components/RegisterForm';

// Template from MUI docs: https://mui.com/getting-started/templates/
const RegisterPageComponent: FC = () => (
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
        Sign up
      </Typography>
      <RegisterForm />
    </Box>
  </Container>
);

export const RegisterPage = memo(RegisterPageComponent);
