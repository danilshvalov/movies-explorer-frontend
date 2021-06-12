import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {AnchorHTMLAttributes} from 'react';
/* -------------------------------------------------------------------------- */
import './Link.css';

export type DOMProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type Props = DOMProps;

/** Обёртка над обычной ссылкой, поддерживающая анимацию при наведении */
export function Link({className, ...props}: Props): JSX.Element {
  const cn = createCn('link', className);

  return (
    <a {...filterInvalidDOMProps(props)} className={cn()}>
      {props.children}
    </a>
  );
}

export default Link;
