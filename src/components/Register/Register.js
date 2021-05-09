import Field from '../Field/Field';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import PushButton from '../PushButton/PushButton';

import './Register.css';

function Register() {
  const className = 'register';
  return (
    <section className={className}>
      <Logo className="register__logo" />
      <Form className="register__form" title="Добро пожаловать!">
        <Field className="register__field" label="Имя" />
        <Field className="register__field" label="E-mail" />
        <Field className="register__field" label="Пароль" />
        <PushButton className="register__submit-button" theme="azure">
          Зарегистрироваться
        </PushButton>
      </Form>
      <span className="register__sub-text">
        Уже зарегистрированы?{' '}
        <a href="#" className="register__link">
          Войти
        </a>
      </span>
    </section>
  );
}

export default Register;
