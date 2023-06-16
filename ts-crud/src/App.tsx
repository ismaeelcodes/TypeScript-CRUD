import './App.css';
import Login from './pages/Login'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home'
import CardCreator from './pages/CardCreator'

function App() {

 


  
  


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Home" element={<Home />} />
      {/* ":cardId?" Checks if there's an id being sent in the url to the card creator, used to differentiate between creating a new card or updating an existing one. */}
      <Route path="/CardCreator/:cardId?" element={<CardCreator />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
