import { Routes, Route } from 'react-router-dom';
import RegisterPage from './routes/_register/RegisterPage';
import HomePage from './routes/_home/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
