import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes path='/*'>
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/signup' element={ <SignupPage /> } />
          <Route path='/' element={ <Home />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
