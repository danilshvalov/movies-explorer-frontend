import Button from '../Button/Button';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__error-code">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <Button className="not-found__button">Назад</Button>
    </div>
  );
}

export default NotFound;
