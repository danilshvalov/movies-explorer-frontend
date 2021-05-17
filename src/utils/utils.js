const parseAttrsToArray = (attrs) => {
  if (!attrs) {
    return [];
  }
  if (typeof attrs === 'string') {
    return [attrs];
  }
  if (attrs instanceof Array) {
    return attrs;
  }

  throw new Error('Attributes should be a string/array/undefined');
};

// Выравнивание количества: если шаг чётный или убрать мы не можем, то мы добавляем до границы;
// Если шаг нечётный - убираем до границы
const alignQuantity = (currentCount, step) => {
  if (currentCount % step === 0) {
    return currentCount;
  }

  if (currentCount < step || step % 2 === 0) {
    return currentCount + step - (currentCount % step);
  }

  return currentCount - (currentCount % step);
};

const parseTime = (minutes) => ({hours: Math.floor(minutes / 60), minutes: minutes % 60});

const stringifyTime = ({hours, minutes}) => (hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`);

export {
  parseAttrsToArray, alignQuantity, parseTime, stringifyTime,
};
