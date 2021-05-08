import {infoCardListData} from '../../utils/constants';
import {withPropsClassNames} from '../../utils/utils';
import InfoCard from '../InfoCard/InfoCard';

import './InfoCardList.css';

function InfoCardList(props) {
  const className = withPropsClassNames(props.className, 'info-list');
  return (
    <div className={className}>
      {infoCardListData.map((cardData) => (
        <InfoCard {...cardData} />
      ))}
    </div>
  );
}

export default InfoCardList;
