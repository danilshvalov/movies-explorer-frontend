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

// eslint-disable-next-line import/prefer-default-export
export {parseAttrsToArray};
