import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2';

export default function AchievementForm() {
  const [form, setForm] = useState({ title: '', type: '', remarks: '' });
  const [entries, setEntries] = useState([]);

  const fetchAchievements = async () => {
    const res = await axiosInstance.get('/achievements');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/achievements', form);
    setForm({ title: '', type: '', remarks: '' });
    Swal.fire("Added!", "Achievement has been added.", "success");
    fetchAchievements();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/achievements/${id}`);
    fetchAchievements();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          placeholder="Achievement Title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Academic">Academic</option>
          <option value="Professional">Professional</option>
          <option value="Research">Research</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="remarks"
          value={form.remarks}
          placeholder="Remarks (Optional)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <ul className="mt-6 space-y-2">
        {entries.map((ach) => (
          <li key={ach._id} className="border p-3 flex justify-between">
            <div>
              <p className="font-semibold">{ach.title}</p>
              <p className="text-sm">Type: {ach.type}</p>
              {ach.remarks && <p className="text-sm italic">{ach.remarks}</p>}
            </div>
            <button onClick={() => handleDelete(ach._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
