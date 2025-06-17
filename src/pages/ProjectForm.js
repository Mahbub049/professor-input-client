import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function ProjectForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tools: '',
    role: '',
    status: ''
  });
  const [entries, setEntries] = useState([]);

  const fetchProjects = async () => {
    const res = await axiosInstance.get('/projects');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/projects', form);
    setForm({ title: '', description: '', tools: '', role: '', status: '' });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['title', 'description', 'tools', 'role', 'status'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        ))}
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">
          Add Project
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">Projects</h3>
      <ul className="mt-4 space-y-3">
        {entries.map((proj) => (
          <li key={proj._id} className="border p-4 flex justify-between items-start">
            <div>
              <p className="font-bold">{proj.title}</p>
              <p className="text-sm italic">{proj.description}</p>
              <p><strong>Tools:</strong> {proj.tools}</p>
              <p><strong>Role:</strong> {proj.role} | <strong>Status:</strong> {proj.status}</p>
            </div>
            <button onClick={() => handleDelete(proj._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
