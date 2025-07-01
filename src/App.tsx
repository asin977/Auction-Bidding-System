import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { Home} from './pages';
import SignIn from './components/UserSignin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
