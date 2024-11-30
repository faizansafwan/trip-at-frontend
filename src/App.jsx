import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
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
