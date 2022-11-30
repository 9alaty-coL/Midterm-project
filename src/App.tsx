import { Suspense, FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { store } from './store';
import { RootRouter } from './routes/RootRouter';
import { AppHeader } from './components/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { theme } from './theme/mui-theme';
import './theme';

import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID : string = "915278922310-r39146v7dninl2i0tr6kjc8ijbm1sgk8.apps.googleusercontent.com"

export const App: FC = () => (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <AppHeader />
            <Container component="main" sx={{ padding: 2, flexGrow: 1 }}>
              <Suspense fallback={<AppLoadingSpinner />}>
                <RootRouter />
              </Suspense>
            </Container>
            {/* App Footer. */}
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>    
  </GoogleOAuthProvider>

);
