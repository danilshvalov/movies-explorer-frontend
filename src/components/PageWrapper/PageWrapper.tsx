import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const PageWrapper = (props: any) => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

export default PageWrapper;
