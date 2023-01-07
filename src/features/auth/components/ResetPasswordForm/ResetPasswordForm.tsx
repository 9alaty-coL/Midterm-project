import { memo, useEffect, FC, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

import { initValues, resetPasswordFormSchema, ResetPasswordFormValue } from './resetPassword-form-settings';
import { selectAuthError, selectIsAuthLoading } from 'src/store/auth/selectors';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserApiService } from 'src/api/services/user-api';
import { AuthApi } from 'src/api/services/auth-api';

interface Props {
  userId: string,
  token: string,
}

const ResetPasswordFormComponent: FC<Props> = ({ token, userId }) => {
  const error = useAppSelector(selectAuthError);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  const handleUserResetPassword = (values: ResetPasswordFormValue): void => {
    if (token === '' || userId === '') {
      return;
    }
    setIsLoading(true);
    UserApiService.updatePassword(values.password, token, userId)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Reset password successfully', {variant: 'success'})
        navigate('/login')
      })
      .catch(error => {
        setIsLoading(false);
        if (error instanceof AxiosError) {
          enqueueSnackbar(error.response?.data.message, {variant: 'error'})
          return;
        }
        enqueueSnackbar('Problem happen. Try again later!', {variant: 'error'});
      })
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: resetPasswordFormSchema,
    onSubmit: handleUserResetPassword,
  })

  return (
    <FormikProvider
      value={formik}
    >
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          name="retypePassword"
          label="Retype New Password"
          type="password"
          id="retypePassword"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={'20px'} color="inherit" /> : 'Reset'}
        </Button>
      </Box>
    </FormikProvider>
  );
};

export const ResetPasswordForm = memo(ResetPasswordFormComponent);
