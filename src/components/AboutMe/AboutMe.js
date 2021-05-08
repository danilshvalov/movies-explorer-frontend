import {withPropsClassNames} from '../../utils/utils';
import avatarImg from '../../images/avatar.png';
import SectionHeader from '../SectionHeader/SectionHeader';
import './AboutMe.css';

function AboutMe(props) {
  const className = withPropsClassNames(props.className, 'about-me');

  // TODO сделать ссылки в виде массива
  return (
    <section className={className}>
      <SectionHeader className="about-me__header">Студент</SectionHeader>
      <div className="about-me__profile">
        <div className="about-me__info">
          <h2 className="about-me__name">Виталий</h2>
          <p className="about-me__feature">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__link-list">
            <li className="about-me__link">Facebook</li>
            <li className="about-me__link">Github</li>
          </ul>
        </div>
        <img className="about-me__photo" src={avatarImg} />
      </div>
    </section>
  );
}

export default AboutMe;
