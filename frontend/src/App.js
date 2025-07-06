import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import AdminLogin from './components/AdminLogin';
import './App.css';

function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    window.location.href = '/';
    return null;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<IssueForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/issues" element={<ProtectedRoute><IssueList /></ProtectedRoute>} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Made for Bengaluru Citizens | Contact: support@fixbengaluru.in</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
