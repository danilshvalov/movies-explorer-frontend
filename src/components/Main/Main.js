import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
// import Footer from '../Footer/Footer';
// import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import './Main.css';

// eslint-disable-next-line no-unused-vars
function Main(props) {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      {/* <Portfolio />
      <Footer /> */}
    </main>
  );
}

export default Main;
