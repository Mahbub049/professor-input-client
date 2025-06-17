import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function AdminRoleForm() {
  const [form, setForm] = useState({ title: '', department: '', date: '' });
  const [entries, setEntries] = useState([]);

  const fetchRoles = async () => {
    const res = await axiosInstance.get('/admin-roles');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/admin-roles', form);
    setForm({ title: '', department: '', date: '' });
    fetchRoles();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/admin-roles/${id}`);
    fetchRoles();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Administrative Roles</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['title', 'department', 'date'].map((field) => (
          <input key={field} name={field} value={form[field]} placeholder={field}
            className="w-full border p-2 rounded" onChange={handleChange} />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <ul className="mt-6 space-y-2">
        {entries.map((role) => (
          <li key={role._id} className="border p-2 flex justify-between">
            <span>{role.title} – {role.department} ({role.date})</span>
            <button onClick={() => handleDelete(role._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
