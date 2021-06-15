import React, {PropsWithChildren, ReactFragment} from 'react';
import Footer from '@product/Footer/Footer';
import Header from '@product/Header/Header';

export function PageWrapper(
  props: PropsWithChildren<ReactFragment>,
): JSX.Element {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default PageWrapper;
