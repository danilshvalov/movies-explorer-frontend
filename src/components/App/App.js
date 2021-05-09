import './App.css';

import Main from '../Main/Main';
import Header from '../Header/Header';
// import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

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
        <Register />
      )}
    </div>
  );
}

export default App;
