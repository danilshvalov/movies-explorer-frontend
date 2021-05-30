import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import './Main.css';
import {sectionIds} from '../../utils/config';

const Main = () => (
  <main className="content">
    <Promo id={sectionIds.promo} />
    <AboutProject id={sectionIds.aboutProject} />
    <Techs id={sectionIds.techs} />
    <AboutMe id={sectionIds.aboutMe} />
  </main>
);

export default Main;
