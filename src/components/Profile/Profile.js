import {concatClassNames} from '../../utils/utils';
import avatarImg from '../../images/avatar.png';
import './Profile.css';

function Profile(props) {
  const className = concatClassNames(props.className, 'profile');

  return (
    <div className={className}>
      <article className="profile__info">
        <h2 className="profile__name">Виталий</h2>
        <p className="profile__feature">Фронтенд-разработчик, 30 лет</p>
        <p className="profile__description">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я
          люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
          компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
      </article>
      <img className="profile__photo" src={avatarImg} />
    </div>
  );
}

export default Profile;
