import classNames from 'classnames';
import {techsData} from '../../utils/constants';
import SectionHeader from '../SectionHeader/SectionHeader';
import TechsList from '../TechsList/TechsList';
import './Techs.css';

function Techs(props) {
  const {list, about} = techsData;
  const className = classNames('techs', props.className);
  return (
    <section className={className}>
      <SectionHeader className="techs__header">Технологии</SectionHeader>
      <h2 className="techs__title">{`${list.length} технологий`}</h2>
      <p className="techs__about">{about}</p>
      <TechsList className="techs__list" />
    </section>
  );
}

export default Techs;
