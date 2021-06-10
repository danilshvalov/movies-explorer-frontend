import React from 'react';
import Footer from '@/Footer';
import Header from '@/Header';

const PageWrapper = (props: any) => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

export default PageWrapper;
