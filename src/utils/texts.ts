import {EXTERNAL_LINKS, PAGE_LINKS, SECTIONS_IDS} from './config';
import {getCopyrightDate} from './utils';
import notFoundCatImg from '../images/not-found-cat.png';

export const aboutMe = {
  header: 'Студент',
};

export const aboutProject = {
  header: 'О проекте',
  infoTable: {
    leftColumn: {
      title: '1 неделя',
      content: 'Back-end',
    },
    rightColumn: {
      title: '4 недели',
      content: 'Front-end',
    },
  },
};

export const footer = {
  links: [
    {
      name: 'Яндекс.Практикум',
      path: EXTERNAL_LINKS.yandexPraktikum,
    },
    {
      name: 'Github',
      path: EXTERNAL_LINKS.github,
    },
    {
      name: 'Telegram',
      path: EXTERNAL_LINKS.telegram,
    },
  ],
  about: 'Учебный проект Яндекс.Практикум х BeatFilm.',
  copyright: `© ${getCopyrightDate()}`,
};

export const notFound = {
  code: '404',
  description: 'Страница не найдена',
  buttonText: 'Назад',
};

export const portfolio = {
  header: 'Портфолио',
  links: [
    {
      name: 'Статичный сайт',
      path: EXTERNAL_LINKS.staticSite,
    },
    {
      name: 'Адаптивный сайт',
      path: EXTERNAL_LINKS.adaptiveSite,
    },
    {
      name: 'Одностраничное приложение',
      path: EXTERNAL_LINKS.SPA,
    },
  ],
};

export const promo = {
  title: 'Учебный проект студента факультета Веб-разработки.',
};

export const personality = {
  name: 'Даниил',
  feature: 'Начинающий фронтенд-разработчик, 17 лет',
  description:
    'Я родился и живу во Владивостоке, Обожаю кодить, увлекаюсь математикой и физикой. Закончил Яндекс.Лицей. Впечатлённый лицеем, решил учиться в Яндекс.Практикуме. Время обучения пролетело незаметно, очень понравилось. На носу ЕГЭ. Очень надеюсь на высокий результат:)',
  buttons: [{text: 'О проекте'}, {text: 'Технологии'}, {text: 'Студент'}],
  links: [
    {
      name: 'Telegram',
      path: EXTERNAL_LINKS.telegram,
    },
    {
      name: 'Github',
      path: EXTERNAL_LINKS.github,
    },
  ],
  img: {
    alt: 'Аватар',
  },
};

export const navTab = {
  buttons: [
    {
      text: 'О проекте',
      to: SECTIONS_IDS.aboutProject,
    },
    {
      text: 'Технологии',
      to: SECTIONS_IDS.techs,
    },
    {
      text: 'Студент',
      to: SECTIONS_IDS.aboutMe,
    },
  ],
};

export const profile = {
  form: {
    submitButton: {
      text: 'Редактировать',
      loadingText: 'Изменяем...',
    },
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

export const errorTexts = {
  internalServer: 'Произошла непредвиденная ошибка. Повторите попытку позднее',
};

export const register = {
  title: 'Добро пожаловать!',
  form: {
    submitButton: {
      text: 'Зарегистрироваться',
      loadingText: 'Регистрируем...',
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
      loadingText: 'Входим...',
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
    {
      name: 'Главная',
      path: PAGE_LINKS.main,
    },
    {
      name: 'Фильмы',
      path: PAGE_LINKS.movies,
    },
    {
      name: 'Сохранённые фильмы',
      path: PAGE_LINKS.savedMovies,
    },
  ],
  desktopMenu: [
    {
      name: 'Фильмы',
      path: PAGE_LINKS.movies,
    },
    {
      name: 'Сохранённые фильмы',
      path: PAGE_LINKS.savedMovies,
    },
  ],
};

export const loginButtons = {
  register: 'Регистрация',
  login: 'Войти',
};

export const nothingFoundStub = {
  description: 'Ничего не удалось найти :/',
  img: {
    src: notFoundCatImg,
    alt: 'Картинка котика',
  },
};

export const techs = {
  header: 'Технологии',
  list: ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'],
  about:
    'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
};
