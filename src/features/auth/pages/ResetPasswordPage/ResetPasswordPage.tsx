import { LockOutlined } from '@mui/icons-material';
import { Container, Box, Avatar, Typography } from '@mui/material';
import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';

const ResetPasswordPageComponent: FC = () => {
  const params = useParams()

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
          Reset Password
        </Typography>
        <ResetPasswordForm userId={params.userID ?? ''} token={params.token ?? ''} />
      </Box>
    </Container>
    // <div style={{
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   marginRight: '-50%',
    //   padding: '25px',
    //   transform: 'translate(-50%, -50%)',
    //   border: '1px solid black',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderRadius: '25px'
    // }}>
    //   <h1>This is a change password page</h1>
    //   <div style={{fontSize: 25}}>UserID: {params.userID}</div>
    //   <div style={{fontSize: 25}}>Token: {params.token}</div>
    // </div>

  );
}

export const ResetPasswordPage = memo(ResetPasswordPageComponent);
