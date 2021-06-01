import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import {Id} from '../../types/types';
import SaveButton from '../SaveButton/SaveButton';
import {SaveCardData} from '../../types/Movie';

import './SaveButtonWrapper.css';

/**
 * Вызываемая функция при сохранении [карточки]{@link SaveButtonWrapper}
 * */
export type SaveFunc = (data: SaveCardData) => void;

export interface SaveButtonWrapperProps
  extends React.HTMLProps<HTMLDivElement> {
  isSaved: boolean;
  onSave: SaveFunc;
  componentId: Id;
  component: React.ComponentType<any>;
}

/** Обёртка над карточкой с возможностью сохранения */
const SaveButtonWrapper = ({
  className,
  isSaved,
  onSave,
  ...props
}: SaveButtonWrapperProps) => {
  const cn = createCn('save-button-wrapper', className);
  /** Переменная-флаг, используется для скрытия кнопки */
  const [isHovered, setHovered] = React.useState(false);
  /**
   * Переменная-флаг, используется для удержания видимости кнопки,
   * если карточка была сохранена
   * */
  const [isChecked, setChecked] = React.useState(isSaved);

  /** Handlers */
  const handleSaveButtonClick = () => {
    onSave({id: props.componentId, isSaved: !isChecked});
    setChecked(!isChecked);
  };

  return (
    <div
      {...filterInvalidDOMProps(props)}
      className={cn()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {React.createElement(props.component, {
        ...props,
        className: cn('component'),
      })}
      <SaveButton
        className={cn('save-button', {checked: isChecked})}
        hidden={!isHovered && !isChecked}
        checked={isChecked}
        onClick={handleSaveButtonClick}
      />
    </div>
  );
};

export default SaveButtonWrapper;
