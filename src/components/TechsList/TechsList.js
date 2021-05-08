import {withPropsClassNames} from '../../utils/utils';
import {techsData} from '../../utils/constants';
import './TechsList.css';
import TechsItem from '../TechsItem/TechsItem';

function TechsList(props) {
  const {list} = techsData;

  const className = withPropsClassNames(props.className, 'techs-list');
  return (
    <ul className={className}>
      {list.map((item) => (
        <TechsItem className="techs-list__item">{item}</TechsItem>
      ))}
    </ul>
  );
}

export default TechsList;
