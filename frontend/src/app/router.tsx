import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UserDetailPage } from '@/pages/UserDetailPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/users/:id', element: <UserDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
