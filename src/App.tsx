import { Routes, Route } from 'react-router-dom';
import RegisterPage from './routes/_register/RegisterPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/register" element={<RegisterPage />} />
       
      </Routes>
    </div>
  );
}

export default App;
