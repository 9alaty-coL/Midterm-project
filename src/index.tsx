import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { CloseSnackbarAction } from './config/CloseSnackbarAction';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
    <SnackbarProvider
      maxSnack={3}
      action={key => <CloseSnackbarAction id={key} />}
    >
      <App />
    </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
