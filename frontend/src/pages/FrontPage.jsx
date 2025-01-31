import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page); // Navigates to the given page ('/login' or '/register')
  };

  return (
    <div style={frontPageStyles}>
      <div style={buttonContainerStyles}>
        <button style={buttonStyles} onClick={() => handleNavigate('/login')}>
          Login
        </button>
        <button style={buttonStyles} onClick={() => handleNavigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
};

// Styling for the page and buttons
const frontPageStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f4',
};

const buttonContainerStyles = {
  textAlign: 'center',
};

const buttonStyles = {
  padding: '15px 30px',
  fontSize: '18px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#4facfe',
  color: 'white',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default FrontPage;
