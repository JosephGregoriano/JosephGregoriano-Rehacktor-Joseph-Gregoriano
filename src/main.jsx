import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import HomePage from './pages/homepage/index.jsx';
import GenrePage from './pages/genrepage/index.jsx';
import GamePage from './pages/gamepage/index.jsx';
import SearchPage from './pages/searchpage/index.jsx';
import RegisterPage from './pages/register/index.jsx';
import LoginPage from './pages/login/index.jsx';
import AccountPage from './pages/account/index.jsx';
import ErrorPage from './pages/error/index.jsx';

import SessionProvider from './context/SessionProvider.jsx';
import FavoritesProvider from './context/FavoritesProvider.jsx';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'games/:genre', element: <GenrePage /> },
      { path: 'games/:slug/:id', element: <GamePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </SessionProvider>
  </StrictMode>
);