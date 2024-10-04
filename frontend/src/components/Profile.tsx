import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';
import { AuthContext } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { logout, token } = useContext(AuthContext)!;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [token]);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
      <div className="profile-content">
        <div className="profile-avatar">
          <img src="/images/black_cat_avatar.png" alt="Avatar do Usuário" />
        </div>
        <div className="profile-details">
          <p>
            <strong>Nome:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>E-mail:</strong> {userData.email}
          </p>
        </div>
      </div>
      <button className="logout-button" onClick={logout}>
        Sair
      </button>
    </div>
  );
};

export default Profile;
