import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegForm from './components/RegForm';
import Login from './components/Login';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegForm />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;

