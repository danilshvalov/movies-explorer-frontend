import {pageLinks} from './config';

export const aboutMe = {
  header: 'Студент',
};

export const aboutProject = {
  header: 'О проекте',
};

export const footer = {
  links: [
    {name: 'Яндекс.Практикум', path: 'https://praktikum.yandex.ru/'},
    {name: 'Github', path: '#'},
    {name: 'Facebook', path: '#'},
  ],
  about: 'Учебный проект Яндекс.Практикум х BeatFilm.',
  copyright: '© 2021',
};

export const notFound = {
  code: '404',
  description: 'Страница не найдена',
  buttonText: 'Назад',
};

export const portfolio = {
  header: 'Портфолио',
  links: [
    {name: 'Статичный сайт', path: '#'},
    {name: 'Адаптивный сайт', path: '#'},
    {name: 'Одностраничное приложение', path: '#'},
  ],
};

export const promo = {
  title: 'Учебный проект студента факультета Веб-разработки.',
};

export const personality = {
  name: 'Виталий',
  feature: 'Фронтенд-разработчик, 30 лет',
  description: `Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я
  люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
  компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
  фриланс-заказами и ушёл с постоянной работы.`,
  buttons: [{text: 'О проекте'}, {text: 'Технологии'}, {text: 'Студент'}],
  links: [
    {name: 'Facebook', path: '#'},
    {name: 'Github', path: '#'},
  ],

  img: {
    alt: 'Аватар',
  },
};

export const navTab = {
  buttons: [{text: 'О проекте'}, {text: 'Технологии'}, {text: 'Студент'}],
};

export const profile = {
  form: {
    submitButton: 'Редактировать',
    nameInput: {
      label: 'Имя',
    },
    emailInput: {
      label: 'E-mail',
    },
  },
  subtext: {
    exitLink: 'Выйти из аккаунта',
  },
};

export const register = {
  title: 'Добро пожаловать!',
  form: {
    submitButton: {
      text: 'Зарегистрироваться',
    },
    nameInput: {
      label: 'Имя',
    },
    emailInput: {
      label: 'E-mail',
    },
    passwordInput: {
      label: 'Пароль',
    },
  },
  subtext: {
    text: 'Уже зарегистрированы?',
    link: 'Войти',
  },
};

export const login = {
  title: 'Рады видеть!',
  form: {
    submitButton: {
      text: 'Войти',
    },
    emailInput: {
      label: 'E-mail',
    },
    passwordInput: {
      label: 'Пароль',
    },
  },
  subtext: {
    text: 'Ещё не зарегистрированы?',
    link: 'Регистрация',
  },
};

export const account = {
  buttons: {
    account: 'Аккаунт',
  },
  accountLogo: {
    alt: 'Изображение человечка',
  },
};

export const searchForm = {
  startButton: {
    label: 'Найти',
  },
  checkBox: {
    label: 'Короткометражки',
  },
  field: {
    placeholder: 'Фильм',
    img: {
      alt: 'Иконка увеличительного стекла',
    },
  },
};

export const moviesCard = {
  saveButton: {
    text: 'Сохранить',
  },
  img: {
    alt: 'Постер к фильму',
  },
};

export const infoTicketsList = [
  {
    title: 'Дипломный проект включал 5 этапов',
    about:
      'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
  },
  {
    title: 'На выполнение диплома ушло 5 недель',
    about:
      'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
  },
];

export const arrowLink = {
  img: {
    alt: 'Иконка стрелочки',
  },
};

export const logo = {
  img: {
    alt: 'Логотип страницы',
  },
};

export const header = {
  mobileMenu: [
    {name: 'Главная', path: pageLinks.main},
    {name: 'Фильмы', path: pageLinks.movies},
    {name: 'Сохранённые фильмы', path: pageLinks.savedMovies},
  ],
  desktopMenu: [
    {name: 'Фильмы', path: pageLinks.movies},
    {name: 'Сохранённые фильмы', path: pageLinks.savedMovies},
  ],
};

export const loginButtons = {
  register: 'Регистрация',
  login: 'Войти',
};

export const nothingFoundStub = {
  description: 'Ничего не удалось найти :/',
};
