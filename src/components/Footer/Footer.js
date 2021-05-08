import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© 2021</p>
        <List className="footer__list">
          <ListItem className="footer__list-item">Яндекс.Практикум</ListItem>
          <ListItem className="footer__list-item">Github</ListItem>
          <ListItem className="footer__list-item">Facebook</ListItem>
        </List>
      </div>
    </footer>
  );
}

export default Footer;
