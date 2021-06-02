import chasingBanksy from '../images/thumbnails/chasing-banksy.png';
import oneHundredYearsOfDesign from '../images/thumbnails/100-years-of-design.png';
import thirtyThreeWordsAboutDesign from '../images/thumbnails/33-words-about-design.jpg';
import runningIsFreedom from '../images/thumbnails/running-is-freedom.png';
import booksellers from '../images/thumbnails/booksellers.png';
import whenIThinkOfGermanyAtNight from '../images/thumbnails/when-i-think-of-germany-at-night.png';
import theStoryOfIggy from '../images/thumbnails/the-story-of-iggy-and-the-stooges.png';
import theLittleGirlIsSad from '../images/thumbnails/the-little-girl-is-sad.png';
import pullYourselfTogether from '../images/thumbnails/pull-yourself-together-before-jumping.png';
import aDogCalledMoney from '../images/thumbnails/a-dog-called-money.png';
import theArtOfSoundInCinema from '../images/thumbnails/the-art-of-sound-in-cinema.png';
import aSymphonyOfNoise from '../images/thumbnails/a-symphony-of-noise.jpeg';
import offTheRecord from '../images/thumbnails/off-the-record.jpeg';
import radiographOfAFamily from '../images/thumbnails/radiograph-of-a-family.jpeg';

const moviesList = [
  {
    movieId: 1,
    duration: 1,
    thumbnail: thirtyThreeWordsAboutDesign,
    nameRU: '33 слова о дизайне',
    isSaved: false,
  },
  {
    movieId: 2,
    duration: 77,
    thumbnail: oneHundredYearsOfDesign,
    nameRU: 'Киноальманах «100 лет дизайна»',
    isSaved: false,
  },
  {
    movieId: 3,
    duration: 77,
    thumbnail: chasingBanksy,
    nameRU: 'В погоне за Бенкси',
    isSaved: false,
  },

  {
    movieId: 4,
    duration: 77,
    thumbnail: runningIsFreedom,
    nameRU: 'Бег это свобода',
    isSaved: false,
  },
  {
    movieId: 5,
    duration: 77,
    thumbnail: booksellers,
    nameRU: 'Книготорговцы',
    isSaved: false,
  },
  {
    movieId: 6,
    duration: 77,
    thumbnail: whenIThinkOfGermanyAtNight,
    nameRU: 'Когда я думаю о Германии ночью',
    isSaved: false,
  },
  {
    movieId: 7,
    duration: 77,
    thumbnail: theStoryOfIggy,
    nameRU: 'Gimme Danger: История Игги и The Stooges',
    isSaved: false,
  },
  {
    movieId: 8,
    duration: 77,
    thumbnail: theLittleGirlIsSad,
    nameRU: 'Дженис: Маленькая девочка грустит',
    isSaved: false,
  },
  {
    movieId: 9,
    duration: 77,
    thumbnail: pullYourselfTogether,
    nameRU: 'Соберись перед прыжком',
    isSaved: true,
  },

  {
    movieId: 10,
    duration: 77,
    thumbnail: aDogCalledMoney,
    nameRU: 'Пи Джей Харви: A dog called money',
    isSaved: true,
  },
  {
    movieId: 11,
    duration: 77,
    thumbnail: theArtOfSoundInCinema,
    nameRU: 'По волнам: Искусство звука в кино',
    isSaved: false,
  },
  {
    movieId: 12,
    duration: 93,
    thumbnail: aSymphonyOfNoise,
    nameRU: 'Мэттью Херберт: Симфония шума',
    isSaved: false,
  },
  {
    movieId: 13,
    duration: 90,
    thumbnail: offTheRecord,
    nameRU: 'Лоран Гарнье: Электрошок',
    isSaved: false,
  },
  {
    movieId: 14,
    duration: 82,
    thumbnail: radiographOfAFamily,
    nameRU: 'Снимок семьи',
    isSaved: true,
  },
];

export const savedMoviesList = moviesList.filter(({isSaved}) => isSaved);

export default moviesList;
