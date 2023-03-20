import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <NoteState>
    <HashRouter basename='/'>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
      </Routes>
      </div>
    </HashRouter>
    </NoteState>
  );
}

export default App;
