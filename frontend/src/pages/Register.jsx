import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch('http://localhost:5555/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }), // Sending email along with username and password
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registration successful! You can now login.');
      navigate('/login');
    } else {
      setMessage(data.message || 'Registration failed!');
    }
  };

  /*return (
    <div className="register-page">
      <h2>Register</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="email" // Changed type to email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updated for email
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      {message && <div className="message">{message}</div>}
    </div>
  );*/

  const registerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  };
  
  const formBoxStyles = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };
  
  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px', // Adds space between input fields
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  const buttonStyles = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4facfe',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold', // Makes the button text bold
    cursor: 'pointer',
  };
  
  const headingStyles = {
    fontWeight: 'bold', // Makes the Register heading bold
    marginBottom: '20px', // Adds space below the heading
  };
  return (
    <div style={registerStyles}>
      <div style={formBoxStyles}>
        <h2 style={headingStyles}>Register</h2>
        <div className="input-group">
          <input
            style={inputStyles}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            style={inputStyles}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            style={inputStyles}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={buttonStyles} onClick={handleRegister}>Register</button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};


export default Register;
