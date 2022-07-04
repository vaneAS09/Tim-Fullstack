//import logo from './logo.svg';
import './CSS/Home.css';


//importamos los componentes
import CompShowUsers from './Users/ShowUsers';
import CompCreateUsers from './Users/CreateUsers';
import CompEditUsers from './Users/EditUsers';
import Dashboard from './Dashboard';
import Login from './Login';

//importamos el router
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
            
      </header>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route index element={ <Login /> } />
            <Route path='/Dashboard' element={ <Dashboard />} />
            <Route path='/ShowUsers' element={ <CompShowUsers />} />
            <Route path='/create' element={ <CompCreateUsers />} />
            <Route path='/edit/:id' element={ <CompEditUsers />} />
            <Route path='*' element={ <Navigate replace to="/"/> }/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
