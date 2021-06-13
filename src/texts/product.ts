import {EXTERNAL_LINKS, PAGE_LINKS, SECTIONS_IDS} from '@utils/config';
import {getCopyrightDate} from '@utils/utils';

export const ABOUT_ME = {
  header: 'Студент',
};
/* -------------------------------------------------------------------------- */

export const ABOUT_PROJECT = {
  header: 'О проекте',
  infoTable: {
    leftColumn: {
      content: 'Back-end',
      title: '1 неделя',
    },
    rightColumn: {
      content: 'Front-end',
      title: '4 недели',
    },
  },
};
/* -------------------------------------------------------------------------- */

export const ACCOUNT = {
  accountLogo: {
    alt: 'Изображение человечка',
  },
  buttons: {
    account: 'Аккаунт',
  },
};
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  about: 'Учебный проект Яндекс.Практикум х BeatFilm.',
  copyright: `© ${getCopyrightDate()}`,
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
};
/* -------------------------------------------------------------------------- */

export const HEADER = {
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
};
/* -------------------------------------------------------------------------- */

export const INFO_TICKETS_LIST = [
  {
    about:
      'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    title: 'Дипломный проект включал 5 этапов',
  },
  {
    about:
      'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    title: 'На выполнение диплома ушло 5 недель',
  },
];
/* -------------------------------------------------------------------------- */

export const LOGIN = {
  form: {
    emailInput: {
      label: 'E-mail',
    },
    passwordInput: {
      label: 'Пароль',
    },
    submitButton: {
      loadingText: 'Входим...',
      text: 'Войти',
    },
  },
  subtext: {
    link: 'Регистрация',
    text: 'Ещё не зарегистрированы?',
  },
  title: 'Рады видеть!',
};
/* -------------------------------------------------------------------------- */

export const NAV_TAB = {
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
/* -------------------------------------------------------------------------- */

export const NOT_FOUND = {
  buttonText: 'Назад',
  code: '404',
  description: 'Страница не найдена',
};
/* -------------------------------------------------------------------------- */

export const PERSONALITY = {
  buttons: [
    {
      text: 'О проекте',
    },
    {
      text: 'Технологии',
    },
    {
      text: 'Студент',
    },
  ],
  description:
    'Я родился и живу во Владивостоке, Обожаю кодить, увлекаюсь математикой и физикой. Закончил Яндекс.Лицей. Впечатлённый лицеем, решил учиться в Яндекс.Практикуме. Время обучения пролетело незаметно, очень понравилось. На носу ЕГЭ. Очень надеюсь на высокий результат:)',
  feature: 'Начинающий фронтенд-разработчик, 17 лет',
  img: {
    alt: 'Аватар',
  },
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
  name: 'Даниил',
};
/* -------------------------------------------------------------------------- */

export const PORTFOLIO = {
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
/* -------------------------------------------------------------------------- */

export const PROFILE = {
  form: {
    emailInput: {
      label: 'E-mail',
    },
    nameInput: {
      label: 'Имя',
    },
    submitButton: {
      loadingText: 'Изменяем...',
      text: 'Редактировать',
    },
  },
  subtext: {
    exitLink: 'Выйти из аккаунта',
  },
};
/* -------------------------------------------------------------------------- */

export const PROMO = {
  title: 'Учебный проект студента факультета Веб-разработки.',
};
/* -------------------------------------------------------------------------- */

export const REGISTER = {
  form: {
    emailInput: {
      label: 'E-mail',
    },
    nameInput: {
      label: 'Имя',
    },
    passwordInput: {
      label: 'Пароль',
    },
    submitButton: {
      loadingText: 'Регистрируем...',
      text: 'Зарегистрироваться',
    },
  },
  subtext: {
    link: 'Войти',
    text: 'Уже зарегистрированы?',
  },
  title: 'Добро пожаловать!',
};
/* -------------------------------------------------------------------------- */

export const TECHS = {
  about:
    'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
  header: 'Технологии',
  list: ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'],
};
/* -------------------------------------------------------------------------- */
