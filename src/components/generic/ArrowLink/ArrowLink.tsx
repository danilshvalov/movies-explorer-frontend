import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import * as GenericLink from '@generic/Link/Link';
/* --------------------------------- Imaged --------------------------------- */
import images from '@images';
/* ---------------------------------- Texts --------------------------------- */
import {ARROW_LINK as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './ArrowLink.css';

export type Props = GenericLink.Props;

/** Ссылка с картинкой стрелочки */
export function ArrowLink({className, ...props}: Props): JSX.Element {
  const cn = createCn('arrow-link', className);

  return (
    <GenericLink.Link {...props} className={cn()}>
      {props.children}
      <img className={cn('picture')} src={images.ARROW_LINK} alt={TEXTS.img.alt} />
    </GenericLink.Link>
  );
}

export default ArrowLink;
