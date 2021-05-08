import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// eslint-disable-next-line no-unused-vars
function MoviesCardList(props) {
  return (
    <section className="movies-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  );
}

export default MoviesCardList;
