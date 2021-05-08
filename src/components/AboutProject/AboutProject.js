// import InfoCard from '../InfoCard/InfoCard';
import InfoCardList from '../InfoCardList/InfoCardList';
import InfoTable from '../InfoTable/InfoTable';
import SectionHeader from '../SectionHeader/SectionHeader';
import './AboutProject.css';

// eslint-disable-next-line no-unused-vars
function AboutProject(props) {
  return (
    <section className="about-project">
      <SectionHeader className="about-project__header">О проекте</SectionHeader>
      <InfoCardList className="about-project__list" />
      <InfoTable className="about-project__info-table" />
    </section>
  );
}

export default AboutProject;
