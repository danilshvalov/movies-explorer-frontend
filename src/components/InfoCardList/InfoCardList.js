import {infoCardListData} from '../../utils/constants';
import {concatClassNames} from '../../utils/utils';
import InfoCard from '../InfoCard/InfoCard';

import './InfoCardList.css';

function InfoCardList(props) {
  const className = concatClassNames(props.className, 'info-list');
  return (
    <div className={className}>
      {infoCardListData.map((cardData) => (
        <InfoCard {...cardData} />
      ))}
    </div>
  );
}

export default InfoCardList;
