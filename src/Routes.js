import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
const RouterMap = () => {
  return (
    <main>
    <Routes>
      {/* 1. Public Route: Login */}
      <Route path="/" element={<LoginComponent />} />
      {/* 3. Catch-all Route for 404 */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
    </main>
  );
};

export default RouterMap;