import { memo, useEffect, FC } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

import { initValues, registerFormSchema, RegisterFormValue } from './register-form-settings';
import { selectAuthError, selectIsAuthLoading } from 'src/store/auth/selectors';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  const handleUserRegister = (values: RegisterFormValue): void => {
    dispatch(AuthActions.register(values)).then(result => {
      if (result.payload instanceof AxiosError) {
        return enqueueSnackbar((result.payload?.response?.data as {message: string}).message, { variant: 'error' });
      }
      enqueueSnackbar('Register successfully! Check your email to activate the account (CHECK SPAM TOO).', {variant: 'success'})
      navigate('/login');
    });
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: registerFormSchema,
    onSubmit: handleUserRegister,
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
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="yearOfBirth"
          label="Age"
          name="yearOfBirth"
          type="number"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
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
          label="Retype Password"
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
          {isLoading ? <CircularProgress size={'20px'} color="inherit" /> : 'Sign Up'}
        </Button>
      </Box>
    </FormikProvider>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
