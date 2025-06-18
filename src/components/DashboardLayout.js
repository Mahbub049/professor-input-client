import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const links = [
    { to: 'profile', label: 'Profile' },
    { to: 'education', label: 'Education' },
    { to: 'experience', label: 'Experience' },
    { to: 'courses', label: 'Courses' },
    { to: 'admin-roles', label: 'Admin Roles' },
    { to: 'memberships', label: 'Memberships' },
    { to: 'achievements', label: 'Achievements' },
    { to: 'skills', label: 'Skills' },
    { to: 'publications', label: 'Publications' },
    { to: 'projects', label: 'Projects' }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">Dashboard</div>
        <nav className="flex-1 px-4 py-2 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={`/dashboard/${link.to}`}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="p-4 bg-red-600 hover:bg-red-700 text-white w-full">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
