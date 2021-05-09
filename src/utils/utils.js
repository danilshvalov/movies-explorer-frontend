import {strict} from 'assert';
import {DOMProps} from './constants';

const getOnlyDOMProps = (props) => {
  const attrs = Object.keys(props)
    .filter((key) => DOMProps.some((prop) => prop === key))
    .map((key) => ({[key]: props[key]}));
  if (attrs.length > 0) {
    return Object.assign(...attrs);
  }
};

function concatClassNames(className, ...classNames) {
  strict(typeof className === 'string' || !className, 'className should be a string');
  strict(classNames.length !== 0, "classNames list shouldn't be empty");

  if (!className) {
    className = '';
  }

  classNames.forEach((otherClassName) => {
    className += ` ${otherClassName}`;
  });
  return className;
}

export {getOnlyDOMProps, concatClassNames};
