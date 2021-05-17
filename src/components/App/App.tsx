import {Route, Switch} from 'react-router';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageWrapper from '../PageWrapper/PageWrapper';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import {UserData as LoginUserData} from '../LoginForm/LoginForm';
import {UserData as RegisterUserData} from '../RegisterForm/RegisterForm';
import {UserData as ProfileUserData} from '../ProfileForm/ProfileForm';

import './App.css';
import Profile from '../Profile/Profile';

const App = () => {
  const handleLogin = (userData: LoginUserData) => {
    /* do something */
    console.log(userData);
  };

  const handleRegister = (userData: RegisterUserData) => {
    /* do something */
    console.log(userData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleProfileUpdate = (userData: ProfileUserData) => {
    /* do something */
    console.log(userData);
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <PageWrapper>
            <Main />
          </PageWrapper>
        </Route>

        <Route path="/movies">
          <PageWrapper>
            <Movies />
          </PageWrapper>
        </Route>

        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/profile">
          <Profile onProfileUpdate={handleProfileUpdate} />
        </Route>

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
