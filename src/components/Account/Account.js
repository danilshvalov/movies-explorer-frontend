import {Route} from 'react-router-dom';
import PushButton from '../PushButton/PushButton';
import './Account.css';

// eslint-disable-next-line no-unused-vars
function Account(props) {
  const isLoggedIn = true;
  const className = `${props.className ? props.className : ''} account`;
  return (
    <div className={className}>
      {isLoggedIn ? (
        <div className="account__container">
          <PushButton className="account__button">Регистрация</PushButton>
          <PushButton className="account__button" theme="azure">
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

export default Account;
