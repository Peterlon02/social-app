import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

function App() {


  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { dispatch } = useAuth();

  useEffect(() => {
    // Controlla se esiste un token nel localStorage
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('user');

    try {
      const user = userJson ? JSON.parse(userJson) : null;  // Solo tentativo di parsing se la stringa non è null
      if (token && user) {
        // Aggiorna lo stato se ci sono token e utente salvati
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      // Opzionale: pulisci i dati corrotti nel localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      // Altre azioni, come reindirizzare l'utente alla pagina di login
    }
  }, [dispatch]);

  return (
    <Router>
      <div className='app'>
        <AppRoutes />
      </div>
    </Router>
  );
}

function AppRoutes() {
  const { state } = useAuth();
  

  return (
    <Routes>
      {/* Usa Navigate per il reindirizzamento basato sull'autenticazione */}
      {state.isAuthenticated ? (
        <Route path='/' element={<Navigate to='/home' replace />} />
      ) : (
        
        <Route path='/' element={<Login />} />
      )}
      {/* Rotta protetta per la homepage */}
      <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path='/register' element={<Registration />}/>
    </Routes>
  );
}

// Componente per gestire le rotte protette
function ProtectedRoute({ children }) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    // Reindirizza alla pagina di login se l'utente non è autenticato
    return <Navigate to='/' replace />;
  }

  return children;
}

export default App;
