import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual login API endpoint when available
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // Redirect user to /home/:userId page
        const userType = data.user.role;
        if (userType === 'manager') {
            navigate(`/manager`);
          } else if (userType === 'resident') {
            navigate(`/home/${data.user._id}`);
          }
      } else {
        // Handle login failure (e.g., show error message)
      }
      // Handle login success (e.g., store user data, navigate to dashboard)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className="p-fluid">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" label="Login" />
      </form>
    </div>
  );
};

export default Login;
