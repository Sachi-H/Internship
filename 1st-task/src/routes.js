import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegForm from './components/RegForm';
import Login from './components/Login';
import Home from './components/Home';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegForm />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;

