import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../userAPI';
import Loading from './Loading';

const initialFormValue = {
  userName: '',
};
function Login() {
  const navegate = useNavigate();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [formvalidation, setformValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userName } = formValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };
  const handleValidationBtn = () => {
    const userNameValidation = userName.length >= 3;
    setformValidation(userNameValidation);
  };

  const handleClickbtn = async () => {
    setIsLoading(true);
    await createUser({ name: userName });
    navegate('/search');
    setIsLoading(false);
  };

  useEffect((handleValidationBtn), [userName]);
  return (
    <form>
      <label htmlFor="user-name">Nome</label>
      <input
        type="text"
        id="user-name"
        data-testid="login-name-input"
        name="userName"
        value={ userName }
        onChange={ handleInputChange }
      />
      <button
        data-testid="login-submit-button"
        type="button"
        disabled={ !formvalidation }
        onClick={ handleClickbtn }
      >
        Entrar

      </button>
      {isLoading && <Loading />}
    </form>
  );
}
export default Login;
