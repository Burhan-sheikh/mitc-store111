import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/shared/LoadingScreen';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
        <Route path="/admin" element={<div>Admin Panel - Coming Soon</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;