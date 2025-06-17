import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileForm from './pages/ProfileForm';
import EducationForm from './pages/EducationForm';
import ExperienceForm from './pages/ExperienceForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/dashboard/profile" element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
        } />
        <Route path="/dashboard/education" element={
          <PrivateRoute>
            <EducationForm />
          </PrivateRoute>
        } />
        <Route path="/dashboard/experience" element={
          <PrivateRoute>
            <ExperienceForm />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
