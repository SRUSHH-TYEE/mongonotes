import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Component/Alert';

function App() {
  return (
    <NoteState>
    <HashRouter basename='/'>
      <Navbar/>
      <Alert message={"Hello"}/>
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
