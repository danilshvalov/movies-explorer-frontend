import classNames from 'classnames';
import {techsData} from '../../utils/constants';
import './TechsList.css';
import TechsItem from '../TechsItem/TechsItem';
// import List from '../List/List';

function TechsList(props) {
  const {list} = techsData;

  const className = classNames('techs-list', props.className);
  return (
    <ul className={className}>
      {list.map((item) => (
        <TechsItem className="techs-list__item">{item}</TechsItem>
      ))}
    </ul>
  );
}

export default TechsList;
