import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2'

export default function MembershipForm() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    memberId: ''
  });

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
    Swal.fire({
      title: "Membership Added!",
      text: "Information has been updated!",
      icon: "success"
    });
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
        <input
          name="name"
          value={form.name}
          placeholder="Organization"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Lifetime">Lifetime</option>
          <option value="Yearly">Yearly</option>
          <option value="Honorary">Honorary</option>
        </select>

        <input
          name="memberId"
          value={form.memberId}
          placeholder="Membership ID"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>


      <ul className="mt-6 space-y-2">
        {entries.map((mem) => (
          <li key={mem._id} className="border p-2 flex justify-between">
            <div>
              <p className="font-semibold">{mem.name}</p>
              <p>Type: {mem.type} | ID: {mem.memberId}</p>
            </div>
            <button onClick={() => handleDelete(mem._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
