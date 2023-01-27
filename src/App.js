import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import { JwtProvider } from "./contexts/JwtContext";
import EditPage from './components/EditPage/EditPage';

function App() {
  return (
    <>
      <HashRouter pathname='/blog-writer'>
        <JwtProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/posts/:postId' element={<EditPage />} />
          </Routes>
        </JwtProvider>
      </HashRouter>
    </>
  );
}

export default App;
