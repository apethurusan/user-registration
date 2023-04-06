import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './component/Appheader';
import User from './pages/User';
import UserCreate from './pages/UserCreate';
import UserEdit from './pages/UserEdit';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/user/create' element={<UserCreate />}></Route>
          <Route path='/user/edit/:userid' element={<UserEdit />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
