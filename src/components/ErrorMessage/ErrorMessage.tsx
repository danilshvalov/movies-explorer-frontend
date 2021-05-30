import {createCn} from 'bem-react-classname';
import React from 'react';

import './ErrorMessage.css';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Флаг видимости сообщения */
  isHidden?: boolean;
}

/** Сообщение об ошибке, появляющееся рядом с мышкой */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  isHidden = false,
  ...props
}) => {
  const cn = createCn('error-message', className);

  /** Текущая позиция мышки */
  const [mousePos, setMousePos] = React.useState({x: 0, y: 0});

  React.useEffect(() => {
    const handleMouseMove = (evt: MouseEvent): void => {
      setMousePos({x: evt.clientX, y: evt.clientY});
    };

    /** Если сообщение скрыто - снимаем обработчик */
    if (isHidden) {
      window.removeEventListener('mousemove', handleMouseMove);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHidden]);

  return (
    <div {...props} className={cn()}>
      {!isHidden && (
        <div
          className={cn('container')}
          style={{left: mousePos.x, top: mousePos.y}}
        >
          <span className={cn('text')}>{props.children}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
