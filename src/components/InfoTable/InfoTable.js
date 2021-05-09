import {concatClassNames} from '../../utils/utils';
import './InfoTable.css';

function InfoTable(props) {
  const data = [
    {title: '1 неделя', content: 'Back-end'},
    {title: '4 недели', content: 'Front-end'},
  ];
  const className = concatClassNames(props.className, 'info-table');
  return (
    <div className={className}>
      {data.map(({title, content}, index) => {
        const style = index % 2 === 0 ? 'azure' : 'light';
        return (
          <div className="info-table__item">
            <h3 className={`info-table__title info-table__title_theme_${style}`}>{title}</h3>
            <p className="info-table__content">{content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default InfoTable;
