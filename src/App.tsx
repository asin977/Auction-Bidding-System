import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SignInPage } from './pages/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
