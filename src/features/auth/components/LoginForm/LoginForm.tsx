import { memo, useEffect, FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';

import { initValues, loginFormSchema, LoginFormValue } from './form-settings';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      // TODO (Danil K): Add error handling here.
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  }, [error]);

  const handleUserLogin = (values: LoginFormValue): void => {
    dispatch(AuthActions.loginUser(values));
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={loginFormSchema}
      onSubmit={handleUserLogin}
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
        >
          Sign In
        </Button>
      </Box>
    </Formik>
  );
};

export const LoginForm = memo(LoginFormComponent);
