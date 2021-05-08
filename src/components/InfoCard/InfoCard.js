import {withPropsClassNames} from '../../utils/utils';
import './InfoCard.css';

function InfoCard(props) {
  const className = withPropsClassNames(props.className, 'info-card');
  return (
    <div className={className}>
      <h3 className="info-card__title">{props.title}</h3>
      <p className="info-card__about">{props.about}</p>
    </div>
  );
}

export default InfoCard;
