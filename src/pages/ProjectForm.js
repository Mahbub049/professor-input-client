import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2'

export default function ProjectForm() {
  const [form, setForm] = useState({
    title: '',
    status: 'Ongoing',
    fundingSource: '',
    grantingBody: '',
    notes: ''
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
    setForm({
      title: '',
      status: 'Ongoing',
      fundingSource: '',
      grantingBody: '',
      notes: ''
    });
    Swal.fire({
      title: "Project Added!",
      text: "Information has been updated!",
      icon: "success"
    });
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
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          name="fundingSource"
          placeholder="Funding Source"
          value={form.fundingSource}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="grantingBody"
          placeholder="Granting Body (optional)"
          value={form.grantingBody}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        />
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
              <p><strong>Status:</strong> {proj.status}</p>
              <p><strong>Funding:</strong> {proj.fundingSource}</p>
              {proj.grantingBody && <p><strong>Granting Body:</strong> {proj.grantingBody}</p>}
              {proj.notes && <p><strong>Notes:</strong> {proj.notes}</p>}
            </div>
            <button onClick={() => handleDelete(proj._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
