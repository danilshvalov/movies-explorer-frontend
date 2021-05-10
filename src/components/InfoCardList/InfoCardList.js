import classNames from 'classnames';
import {infoCardListData} from '../../utils/constants';
import InfoCard from '../InfoCard/InfoCard';

import './InfoCardList.css';

function InfoCardList(props) {
  const className = classNames('info-list', props.className);
  return (
    <div className={className}>
      {infoCardListData.map((cardData) => (
        <InfoCard {...cardData} />
      ))}
    </div>
  );
}

export default InfoCardList;
