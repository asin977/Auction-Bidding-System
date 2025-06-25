import './App.css';
import { SignInPage } from './pages/SignInPage';

import { Footer } from './components/footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '../../routes'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Footer />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
