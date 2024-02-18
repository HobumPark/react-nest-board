import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserBoardMain from './components/board/user/UserBoardMain.js';
import UserBoardView from './components/board/user/UserBoardView.js';
import UserBoardWrite from './components/board/user/UserBoardWrite.js';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';
import Login from './components/member/Login.js';
import KakaoLoginPage from './components/member/KakaoLoginPage.js';

function App() {
  return (
    <div id="App">
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<UserBoardMain />} />
            <Route path='/view' element={<UserBoardView/>}/>
            <Route path='/write' element={<UserBoardWrite/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/kakao' element={<KakaoLoginPage />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}
export default App;
