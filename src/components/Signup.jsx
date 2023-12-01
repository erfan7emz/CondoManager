import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const roleOptions = [
    { label: 'Manager', value: 'manager' },
    { label: 'Resident', value: 'resident' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role }),
      });
      const data = await response.json();
      console.log(data);
      // Handle success (e.g., navigate to login page or show a success message)
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="p-fluid">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="role">Role</label>
          <Dropdown 
            id="role" 
            value={role} 
            options={roleOptions} 
            onChange={(e) => setRole(e.value)} 
            placeholder="Select a Role"
          />
        </div>
        <Button type="submit" label="Signup" />
      </form>
    </div>
  );
};

export default Signup;
