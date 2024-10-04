import React, { useState } from 'react';
import './SignUp.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas não coincidem')
      .required('Confirmação de senha é obrigatória'),
  })
  .required();

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // Inicializa o navigate
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      // Envia os dados para o backend
      await axios.post('http://localhost:3002/auth/register', data);
      // Redireciona para a página de login após o cadastro bem-sucedido
      navigate('/login');
    } catch (error: any) {
      // Exibe a mensagem de erro
      setErrorMessage(error.response?.data?.message || 'Erro ao cadastrar usuário');
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">Nome:</label>
          <input id="firstName" type="text" {...register('firstName')} placeholder="Nome" />
          <p className="error">{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Sobrenome:</label>
          <input id="lastName" type="text" {...register('lastName')} placeholder="Sobrenome" />
          <p className="error">{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" {...register('email')} placeholder="Seu email" />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" {...register('password')} placeholder="Sua senha" />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} placeholder="Confirmar sua senha" />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
};

export default SignUp;
