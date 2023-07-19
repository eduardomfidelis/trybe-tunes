import { Route, Routes } from 'react-router-dom';
import Login from './services/Components/Login';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>

    </>
  );
}

export default App;
