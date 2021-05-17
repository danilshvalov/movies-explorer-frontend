import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const PageWrapper: React.FC = (props) => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

export default PageWrapper;
