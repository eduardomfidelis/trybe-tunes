import { Route, Routes } from 'react-router-dom';
import Login from './services/Components/Login';
import Search from './services/Components/Search';
import Album from './services/Components/Album';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Routes>

    </>
  );
}

export default App;
