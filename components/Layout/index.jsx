import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/FooterStyle2';
import Header from '../Header';

export default function Layout2() {
  return (
    <>
      <Header logoSrc="/images/logo.svg" variant="cs_heading_color" />
      <Outlet />
      <Footer />
    </>
  );
}
