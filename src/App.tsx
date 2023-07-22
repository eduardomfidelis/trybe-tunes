import { Route, Routes } from 'react-router-dom';
import Login from './services/Components/Login';
import Search from './services/Components/Search';
import Album from './services/Components/Album';
import Layout from './services/Components/Layout';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
        </Route>

      </Routes>

    </>
  );
}

export default App;
