import PushButton from '../PushButton/PushButton';
import './MoviesCard.css';

// TODO удалить
import poster from '../../images/poster.jpg';

// eslint-disable-next-line no-unused-vars
function MoviesCard(props) {
  const isChecked = false;
  const saveButtonClass = `movies-card__save-button ${isChecked ? 'movies-card__save-button_checked' : ''}`;
  const saveButtonText = isChecked ? '' : 'Сохранить';
  return (
    <div className="movies-card">
      <PushButton className={saveButtonClass}>{saveButtonText}</PushButton>
      <img className="movies-card__poster" src={poster} />
      <div className="movies-card__info">
        <p className="movies-card__name">33 слова о дизайне</p>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </div>
  );
}

export default MoviesCard;
