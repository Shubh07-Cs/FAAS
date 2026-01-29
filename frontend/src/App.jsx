import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Register } from './pages/Register';
import { MarkAttendance } from './pages/MarkAttendance';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/attendance" element={<MarkAttendance />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
