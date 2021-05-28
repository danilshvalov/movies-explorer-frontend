import {createCn} from 'bem-react-classname';
import React from 'react';

import {nothingFoundStub as texts} from '../../utils/texts';

import './NothingFoundStub.css';

export type NothingFoundStubProps = React.HTMLAttributes<HTMLSpanElement>;

const NothingFoundStub: React.FC<NothingFoundStubProps> = ({
  className,
  ...props
}) => {
  const cn = createCn('nothing-found', className);

  return (
    <span {...props} className={cn()}>
      {texts.description}
    </span>
  );
};

export default NothingFoundStub;
