import { memo, useEffect, FC, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

import { initValues, forgotPasswordFormSchema, ForgotPasswordFormValue } from './form-settings';
import { selectAuthError, selectIsAuthLoading } from 'src/store/auth/selectors';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { AuthApi } from 'src/api/services/auth-api';

const ForgotPasswordFormComponent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUserForgotPassword = (values: ForgotPasswordFormValue): void => {
    setIsLoading(true)
    AuthApi.resetPassword(values.email)
      .then(message => {
        enqueueSnackbar(message, { variant: 'success'})
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        if (error instanceof AxiosError) {
          enqueueSnackbar(error.response?.data.message, { variant: 'error' });
          return;
        }
        enqueueSnackbar('Problem happen. Try again later!')
      })
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: forgotPasswordFormSchema,
    onSubmit: handleUserForgotPassword,
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
          id="email"
          label="Your Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={'20px'} color="inherit" /> : 'Reset password'}
        </Button>
      </Box>
    </FormikProvider>
  );
};

export const ForgotPasswordForm = memo(ForgotPasswordFormComponent);
