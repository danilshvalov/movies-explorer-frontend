export const infoCardListData = [
  {
    title: 'Дипломный проект включал 5 этапов',
    about:
      'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    duration: '1 неделя',
    subjectArea: 'Back-end',
  },
  {
    title: 'На выполнение диплома ушло 5 недель',
    about:
      'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    duration: '4 недели',
    subjectArea: 'Front-end',
  },
];

export const techsData = {
  list: ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'],
  about: 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
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
