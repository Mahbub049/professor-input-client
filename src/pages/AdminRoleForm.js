import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2'

export default function AdminRoleForm() {
  const [form, setForm] = useState({
    title: '',
    departmentOrEvent: '',
    roleType: 'Committee',
    from: '',
    to: '',
    notes: ''
  });
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
    setForm({ title: '', departmentOrEvent: '', roleType: 'Committee', from: '', to: '', notes: '' });
    Swal.fire({
      title: "Role Added!",
      text: "Information has been updated!",
      icon: "success"
    });
    fetchRoles();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/admin-roles/${id}`);
    fetchRoles();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Administrative Roles</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Role/Title" className="border p-2 rounded" />
        <input name="departmentOrEvent" value={form.departmentOrEvent} onChange={handleChange} placeholder="Department/Event" className="border p-2 rounded" />

        <select name="roleType" value={form.roleType} onChange={handleChange} className="border p-2 rounded">
          {['Committee', 'Editorial', 'Event', 'Department'].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="flex space-x-2">
          <input type="text" name="from" value={form.from} onChange={handleChange} placeholder="From (e.g. 2018)" className="border p-2 rounded w-full" />
          <input type="text" name="to" value={form.to} onChange={handleChange} placeholder="To (e.g. 2024)" className="border p-2 rounded w-full" />
        </div>

        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="border p-2 rounded col-span-2" />

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">Add Admin Role</button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Admin Positions</h3>
      <ul className="mt-4 space-y-2">
        {entries.map((role) => (
          <li key={role._id} className="border p-4 flex justify-between items-start">
            <div>
              <p><strong>{role.title}</strong> ({role.roleType})</p>
              <p>{role.departmentOrEvent}</p>
              <p>Duration: {role.from} – {role.to}</p>
              {role.notes && <p className="italic text-sm text-gray-600">Notes: {role.notes}</p>}
            </div>
            <button onClick={() => handleDelete(role._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
