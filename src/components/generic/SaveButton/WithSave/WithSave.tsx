import React from 'react';
import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import SaveButton from '@generic/SaveButton/SaveButton';

import './WithSave.css';

export interface WithSaveProps {
  isSaved: boolean;
}

export type OnSaveFunc<T> = (args: T) => any;

/** @deprecated */
// REMOVE
export default function withSave<ReturnData extends WithSaveProps, P extends ReturnData>(
  Component: React.ComponentType<P>,
  onSave: OnSaveFunc<ReturnData>,
) {
  return (props: P) => {
    const cn = createCn('with-save');
    /** Переменная-флаг, используется для скрытия кнопки */
    const [isHovered, setHovered] = React.useState(false);
    /**
     * Переменная-флаг, используется для удержания видимости кнопки,
     * если карточка была сохранена
     * */
    const [isChecked, setChecked] = React.useState(props.isSaved);

    /** Handlers */
    const handleSaveButtonClick = () => {
      onSave({
        ...(props as ReturnData),
        isSaved: !props.isSaved,
      });
      setChecked(!isChecked);
    };

    return (
      <div
        {...filterInvalidDOMProps(props)}
        className={cn()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Component {...props} className={cn('component')} />
        <SaveButton
          className={cn('save-button', {checked: isChecked})}
          hidden={!isHovered && !isChecked}
          checked={isChecked}
          onClick={handleSaveButtonClick}
        />
      </div>
    );
  };
}
