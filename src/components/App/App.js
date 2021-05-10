import './App.css';

import Main from '../Main/Main';
import Header from '../Header/Header';
// import NotFound from '../NotFound/NotFound';
// import Register from '../Register/Register';
import SearchForm from '../SearchForm/SearchForm';

function App() {
  const someFlag = false;
  return (
    <div className="page">
      {someFlag ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        // <NotFound />
        // <Register />
        <>
          <Header />
          <SearchForm />
        </>
      )}
    </div>
  );
}

export default App;
