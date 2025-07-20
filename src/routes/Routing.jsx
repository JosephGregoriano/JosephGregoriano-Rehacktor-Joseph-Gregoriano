import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from '../pages/homepage/index.jsx';
import RegisterPage from '../pages/register/index.jsx';
import LoginPage from '../pages/login/index.jsx';
import Layout from '../components/Layout.jsx';
import ErrorPage from '../pages/error/index.jsx';
import AccountPage from '../pages/account/index.jsx';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}