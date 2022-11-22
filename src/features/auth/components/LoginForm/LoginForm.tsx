import { memo, useEffect, FC } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

import { initValues, loginFormSchema, LoginFormValue } from './form-settings';
import { selectAuthError, selectIsAuthLoading } from 'src/store/auth/selectors';
import { useSnackbar } from 'notistack';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  const handleUserLogin = (values: LoginFormValue): void => {
    dispatch(AuthActions.login(values));
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: loginFormSchema,
    onSubmit: handleUserLogin,
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
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={'20px'} color="inherit" /> : 'Sign In'}
        </Button>
      </Box>
    </FormikProvider>
  );
};

export const LoginForm = memo(LoginFormComponent);
