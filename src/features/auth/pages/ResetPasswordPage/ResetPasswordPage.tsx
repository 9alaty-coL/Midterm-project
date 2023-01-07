import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordPageComponent: FC = () => {
  const params = useParams()

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      padding: '25px',
      transform: 'translate(-50%, -50%)',
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '25px'
    }}>
      <h1>This is a change password page</h1>
      <div style={{fontSize: 25}}>UserID: {params.userID}</div>
      <div style={{fontSize: 25}}>Token: {params.token}</div>
    </div>

  );
}

export const ResetPasswordPage = memo(ResetPasswordPageComponent);
