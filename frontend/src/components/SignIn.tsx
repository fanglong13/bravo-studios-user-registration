import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './SignIn.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
  })
  .required();

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    try {
      const response = await axios.post('http://localhost:3002/auth/login', data);
      login(response.data.access_token); // Armazena o token
      navigate('/profile'); // Redireciona para a página de perfil
    } catch (error: any) {
      setErrorMessage('E-mail ou senha incorretos.');
      console.error('Erro ao autenticar:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" {...register('email')} placeholder="Seu email" />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" {...register('password')} placeholder="Sua senha" />
          <p className="error">{errors.password?.message}</p>
        </div>

        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default SignIn;
