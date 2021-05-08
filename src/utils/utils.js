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

function withPropsClassNames(propsClassNames, ...classNames) {
  strict(
    typeof propsClassNames === 'string' || !propsClassNames,
    'propsClassNames should be a string',
  );
  strict(classNames.length !== 0, "classNames list shouldn't be");

  if (!propsClassNames) {
    propsClassNames = '';
  }

  classNames.forEach((className) => {
    propsClassNames += ` ${className}`;
  });
  return propsClassNames;
}

export {getOnlyDOMProps, withPropsClassNames};
