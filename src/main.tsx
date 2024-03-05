import React from 'react';
import ReactDOM from 'react-dom/client';
import { Userprovider } from './contexts/appContext';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './router';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Userprovider>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right' closeOnClick />
      </Userprovider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
