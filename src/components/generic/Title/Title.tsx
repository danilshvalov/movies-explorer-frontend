import {createCn} from 'bem-react-classname';
import {createElement, forwardRef, HTMLProps} from 'react';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from 'types/types';
import {WithTheme} from 'types/functional';
/* -------------------------------------------------------------------------- */
import './Title.css';

export type DOMProps = HTMLProps<HTMLHeadingElement>;
export interface DataProps {
  headingType: string;
}
export type FunctionalProps = WithTheme;
export type Props = DOMProps & DataProps & FunctionalProps;

export type RefType = HTMLHeadingElement;

/** Обёртка над заголовком, поддерживающий различные темы */
export const Title = forwardRef<RefType, Props>(
  ({
    className, theme = Theme.Light, headingType, ...props
  }, ref) => {
    const cn = createCn('title', className);
    return createElement(headingType, {
      ...props,
      ref,
      className: cn({theme}),
    });
  },
);

Title.displayName = 'Title';

export default Title;
