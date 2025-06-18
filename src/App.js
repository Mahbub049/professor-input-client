import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from './pages/Login';
import ProfileForm from './pages/ProfileForm';
import EducationForm from './pages/EducationForm';
import ExperienceForm from './pages/ExperienceForm';
import CourseForm from './pages/CourseForm';
import AdminRoleForm from './pages/AdminRoleForm';
import MembershipForm from './pages/MembershipForm';
import PublicationForm from './pages/PublicationForm';
import ProjectForm from './pages/ProjectForm';
import DashboardLayout from './components/DashboardLayout'; // 🆕 import this
import SkillForm from './pages/SkillForm';
import AchievementForm from "./pages/AchievementForm";

// 🔐 PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard Layout */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route path="profile" element={<ProfileForm />} />
          <Route path="education" element={<EducationForm />} />
          <Route path="experience" element={<ExperienceForm />} />
          <Route path="courses" element={<CourseForm />} />
          <Route path="admin-roles" element={<AdminRoleForm />} />
          <Route path="memberships" element={<MembershipForm />} />
          <Route path="achievements" element={<AchievementForm />} />
          <Route path="publications" element={<PublicationForm />} />
          <Route path="projects" element={<ProjectForm />} />
          <Route path="skills" element={<SkillForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
