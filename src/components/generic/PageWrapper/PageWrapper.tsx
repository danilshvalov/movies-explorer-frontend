import Footer from '@generic/Footer/Footer';
import Header from '@product/Header/Header';
import {PropsWithChildren, ReactFragment} from 'react';

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
