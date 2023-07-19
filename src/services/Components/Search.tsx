import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../searchAlbumsAPI';
import Loading from './Loading';

const initialFormValue = {
  artistName: '',
};

type AlbumTipes = {

  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string
  collectionPrice: number;
  artworkUrl100: string
  releaseDate: string
  trackCount: number;

};
function Search() {
  const [formValue, setFormValue] = useState(initialFormValue);
  const [inputValue, setInputValue] = useState('');
  const [inputValidation, setInputValidation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AlbumTipes[]>([]);

  const { artistName } = formValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
    setInputValue(value);
  };

  const handleValidationBtn = () => {
    const artistNameValidation = artistName.length >= 2;
    setInputValidation(artistNameValidation);
  };

  const handleClick = async () => {
    setIsLoading(true);
    setSearchResult([]);
    const result: AlbumTipes[] = await searchAlbumsAPI(artistName);
    setSearchResult(result);
    setIsLoading(false);
    setInputValue('');
  };
  useEffect((handleValidationBtn), [artistName]);
  return (
    <div>
      {!isLoading && (
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            name="artistName"
            value={ inputValue }
            onChange={ handleInputChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ !inputValidation }
            onClick={ handleClick }
          >
            Procurar
          </button>
        </form>
      )}
      {isLoading && (<Loading />)}
      {!isLoading && searchResult.length > 0 && (
        <section>
          <p>
            {`Resultado de álbuns de: ${artistName}`}
          </p>
          {searchResult.map((album) => (
            <div
              key={ album.collectionId }
            >
              {' '}
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionName}
              </Link>

            </div>

          ))}
        </section>
      )}
      {!isLoading && searchResult.length === 0 && (
        <p>
          Nenhum álbum foi encontrado
        </p>
      )}
    </div>
  );
}
export default Search;
