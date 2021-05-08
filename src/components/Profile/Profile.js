import {Route} from 'react-router-dom';
import PushButton from '../PushButton/PushButton';
import './Profile.css';

// eslint-disable-next-line no-unused-vars
function Profile(props) {
  const isLoggedIn = true;
  const className = `${props.className ? props.className : ''} profile`;
  return (
    <div className={className}>
      {isLoggedIn ? (
        <div className="profile__container">
          <PushButton className="profile__button">Регистрация</PushButton>
          <PushButton className="profile__button" theme="azure">
            Войти
          </PushButton>
        </div>
      ) : (
        <></>
      )}
      <Route path="/"></Route>
    </div>
  );
}

export default Profile;
