import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
// import QuizApp from './components/zApp';
import QuizApp from './components/QuizAppViaSeections';
import { Navigate } from "react-router-dom";
import PdfPrintButton from './components/PrintComponent';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RouterMap = () => {
  return (
    <main>
    <Routes>
      {/* 1. Public Route: Login */}
      <Route path="/" element={<LoginComponent />} />
      <Route path="/quiz" element={ <ProtectedRoute>
              <QuizApp />
            </ProtectedRoute>} />
      {/* 3. Catch-all Route for 404 */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
      <Route path="/print" element={<PdfPrintButton />} />
    </Routes>
    </main>
  );
};

export default RouterMap;