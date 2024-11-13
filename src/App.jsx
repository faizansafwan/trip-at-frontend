import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Accomadation from './pages/Accomadation';
import Budget from './pages/Budget';
import Contact from './pages/Contact';
import LeftNav from './components/LeftNavigation';
import NavLinks from './routes';
import BasePage from './pages/BasePage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
  
          <Routes>
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignupPage /> } />
            <Route path='/profile' element={ <UserProfile /> } />            

            <Route path='/*' element={<BasePage /> } />
          
        </Routes>
    
      </BrowserRouter>
      
    </div>
  );
}

export default App;
