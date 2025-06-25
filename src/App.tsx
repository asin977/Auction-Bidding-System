import './App.css';

import { SearchIcon } from './components/search';
import { HomePage } from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <HomePage />
      <SearchIcon />
    </div>
  );
}

export default App;
