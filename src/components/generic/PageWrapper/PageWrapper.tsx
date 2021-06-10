import Footer from '@generic/Footer/Footer';
import Header from '@product/Header/Header';

export function PageWrapper(props: any): JSX.Element {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default PageWrapper;
