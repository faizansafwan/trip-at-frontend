import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes path='/*'>
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/signup' element={ <SignupPage /> } />  
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
