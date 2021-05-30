import {ParsedTime} from './types';

// Выравнивание количества: если шаг чётный или убрать мы не можем, то мы добавляем до границы;
// Если шаг нечётный - убираем до границы
const alignQuantity = (currentCount: number, step: number): number => {
  if (currentCount % step === 0) {
    return currentCount;
  }

  if (currentCount < step || step % 2 === 0) {
    return currentCount + step - (currentCount % step);
  }

  return currentCount - (currentCount % step);
};

const parseTime = (minutes: number): ParsedTime => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

const stringifyTime = ({hours, minutes}: ParsedTime) => (hours && hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`);

const getCopyrightDate = () => {
  const year = new Date().getFullYear();
  return year === 2021 ? '2021' : `2021 - ${year}`;
};

export {
  alignQuantity, parseTime, stringifyTime, getCopyrightDate,
};
