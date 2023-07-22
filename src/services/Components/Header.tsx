import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../userAPI';
import Loading from './Loading';

function Header() {
  const [getUserName, setGetUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setGetUserName(user.name);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <header data-testid="header-component">
        <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </header>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <span data-testid="header-user-name">{getUserName}</span>
        )}
      </div>
    </>

  );
}
export default Header;
