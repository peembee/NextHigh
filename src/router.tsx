import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from './layout/rootLayout';
import { Home } from './home/pages/home';
import { PingPong } from './pingPong/pages/pingPong';
import { Staff } from './staff/pages/staff';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to='/home' /> },
      { path: '/home', element: <Home /> },
      { path: '/pingpong', element: <PingPong /> },
      { path: '/staff', element: <Staff /> },
    ],
  },
]);
