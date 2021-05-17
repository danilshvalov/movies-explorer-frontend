import {createCn} from 'bem-react-classname';
import React from 'react';
import './Button.css';

export enum ButtonTheme {
  Transparent = 'transparent',
  Azure = 'azure',
  Snow = 'snow',
  Ghost = 'ghost',
  Light = 'light',
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  disabled?: boolean;
  rounded?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  className,
  theme = ButtonTheme.Transparent,
  disabled = false,
  rounded = false,
  ...props
}) => {
  const cn = createCn('button', className);

  return (
    <button
      {...props}
      className={cn({
        theme,
        disabled,
        rounded,
      })}
    >
      {props.children}
    </button>
  );
};

export default Button;
