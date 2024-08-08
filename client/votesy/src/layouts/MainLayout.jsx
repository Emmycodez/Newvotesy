import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/facebook-login', '/instagram-login', '/upload', '/gmail-login'];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
