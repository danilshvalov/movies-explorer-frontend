import {withPropsClassNames} from '../../utils/utils';
import './InfoCard.css';

function InfoCard(props) {
  const className = withPropsClassNames(props.className, 'info-card');
  return (
    <div className={className}>
      <h3 className="info-card__title">{props.title}</h3>
      <p className="info-card__about">{props.about}</p>
      <div className="info-card__container">
        <div className="info-card__duration">{props.duration}</div>
        <div className="info-card__subject-area">{props.subjectArea}</div>
      </div>
    </div>
  );
}

export default InfoCard;
