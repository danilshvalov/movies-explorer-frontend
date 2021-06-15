import React, {HTMLAttributes} from 'react';
import {createCn} from 'bem-react-classname';

import './SectionHeader.css';

export type SectionHeaderProps = HTMLAttributes<HTMLHeadingElement>;

export type RefType = HTMLHeadingElement;

/** Заголовок для секций с нижним подчеркиванием */
const SectionHeader = React.forwardRef<RefType, SectionHeaderProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('section-header', className);

    return (
      <h2 {...props} ref={ref} className={cn()}>
        {props.children}
      </h2>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
