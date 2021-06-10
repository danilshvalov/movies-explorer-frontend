import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import * as GenericLink from '@generic/Link/Link';
/* --------------------------------- Imaged --------------------------------- */
import arrowLinkImg from '@images/arrow-link.svg';
/* ---------------------------------- Utils --------------------------------- */
import {arrowLink as texts} from '@utils/texts';
/* -------------------------------------------------------------------------- */
import './ArrowLink.css';

export type Props = GenericLink.Props;

/** Ссылка с картинкой стрелочки */
export function ArrowLink({className, ...props}: Props): JSX.Element {
  const cn = createCn('arrow-link', className);

  return (
    <GenericLink.Link {...props} className={cn()}>
      {props.children}
      <img className={cn('picture')} src={arrowLinkImg} alt={texts.img.alt} />
    </GenericLink.Link>
  );
}

export default ArrowLink;
