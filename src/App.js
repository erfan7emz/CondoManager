import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/HomePage';
import ManagerDashboard from './components/Manager';

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
