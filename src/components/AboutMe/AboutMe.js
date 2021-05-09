import {concatClassNames} from '../../utils/utils';
import SectionHeader from '../SectionHeader/SectionHeader';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import Profile from '../Profile/Profile';

function AboutMe(props) {
  const className = concatClassNames(props.className, 'about-me');

  // TODO сделать ссылки в виде массива
  return (
    <section className={className}>
      <SectionHeader className="about-me__header">Студент</SectionHeader>
      <Profile className="about-me__profile" />
      <ul className="about-me__list">
        <li className="about-me__list-item">Facebook</li>
        <li className="about-me__list-item">Github</li>
      </ul>
      <Portfolio className="about-me__portfolio" />
    </section>
  );
}

export default AboutMe;
