import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import {Id} from '../../utils/types';
import DeleteButton from '../DeleteButton/DeleteButton';

import './DeleteButtonWrapper.css';

/** Возвращаемые данные при нажатии [кнопки]{@link DeleteButton} */
export interface DeleteData {
  id: Id;
}

/** callback функция, вызываемая при нажатии [кнопки]{@link DeleteButton} */
export type DeleteFunc = (data: DeleteData) => void;

export interface DeleteButtonWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDelete: DeleteFunc;
  componentId: Id;
  component: React.ComponentType<any>;
}

/** Компонент, оборачивающий элемент в контейнер,
 * содержащий [кнопку удаления]{@link DeleteButton} */
const DeleteButtonWrapper = ({
  className,
  onDelete,
  ...props
}: DeleteButtonWrapperProps) => {
  const cn = createCn('delete-button-wrapper', className);

  /** Переменная-флаг, делает кнопку видимой при наведении на контейнер */
  const [isButtonVisible, setButtonVisible] = React.useState(false);

  /** Handler нажатия на [кнопку]{@link DeleteButton} */
  const handleDelete = () => onDelete({id: props.componentId});

  return (
    <div
      {...filterInvalidDOMProps(props)}
      className={cn()}
      onMouseEnter={() => setButtonVisible(true)}
      onMouseLeave={() => setButtonVisible(false)}
    >
      {React.createElement(props.component, {
        ...props,
        className: cn('component'),
      })}

      <DeleteButton
        className={cn('delete-button')}
        onClick={handleDelete}
        hidden={!isButtonVisible}
      />
    </div>
  );
};

export default DeleteButtonWrapper;
