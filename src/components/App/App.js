import './App.css';

import Main from '../Main/Main';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';

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
        <NotFound />
      )}
    </div>
  );
}

export default App;
