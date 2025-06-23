import React from 'react';
import './App.css';
import {Footer,} from './components/Footer'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
               <Route path='/home' element={<Footer />}></Route>
         </Routes >
           <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
