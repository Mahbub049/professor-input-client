import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function MembershipForm() {
  const [form, setForm] = useState({ name: '', memberId: '' });
  const [entries, setEntries] = useState([]);

  const fetchMemberships = async () => {
    const res = await axiosInstance.get('/memberships');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/memberships', form);
    setForm({ name: '', memberId: '' });
    fetchMemberships();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/memberships/${id}`);
    fetchMemberships();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Memberships</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['name', 'memberId'].map((field) => (
          <input key={field} name={field} value={form[field]} placeholder={field}
            className="w-full border p-2 rounded" onChange={handleChange} />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <ul className="mt-6 space-y-2">
        {entries.map((mem) => (
          <li key={mem._id} className="border p-2 flex justify-between">
            <span>{mem.name} – ID: {mem.memberId}</span>
            <button onClick={() => handleDelete(mem._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
