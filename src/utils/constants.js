export const techsData = {
  list: ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'],
  about:
    'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
};

export const routes = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signUp: '/signup',
  signIn: '/signin',
};

export const navigationLinks = [
  {name: 'Фильмы', path: routes.movies},
  {name: 'Сохранённые фильмы', path: routes.savedMovies},
];

export const internalLinks = [{name: 'Главная', to: routes.main}];
