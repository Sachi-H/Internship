import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import RegForm from './components/RegForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='/registration' element={<RegForm />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
