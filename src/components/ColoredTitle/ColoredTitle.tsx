import {createCn} from 'bem-react-classname';
import React from 'react';
import {Theme} from '../../types/types';

import './ColoredTitle.css';

export interface ColoredTitleProps extends React.HTMLProps<HTMLHeadingElement> {
  /** Внешний вид заголовка */
  theme?: Theme;
  /** Тип заголовка (h1, h2, h3 и так далее) */
  headingType: string;
}

export type RefType = HTMLHeadingElement;

/** Обёртка над заголовком, поддерживающий различные темы */
const ColoredTitle = React.forwardRef<RefType, ColoredTitleProps>(
  ({
    className, theme = Theme.Light, headingType, ...props
  }, ref) => {
    const cn = createCn('colored-title', className);
    return React.createElement(headingType, {
      ...props,
      ref,
      className: cn({theme}),
    });
  },
);

export default ColoredTitle;
