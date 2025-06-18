import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function SkillForm() {
  const [form, setForm] = useState({
    category: 'Language',
    skillName: '',
    description: ''
  });
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const res = await axiosInstance.get('/skills');
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/skills', form);
    setForm({ category: 'Language', skillName: '', description: '' });
    Swal.fire({
      title: "Skill Added!",
      text: "Information has been updated!",
      icon: "success"
    });
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/skills/${id}`);
    fetchSkills();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Skill</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {['Language', 'Computer', 'Soft', 'Other'].map((cat) => (
            <option key={cat} value={cat}>{cat} Skill</option>
          ))}
        </select>

        <input
          name="skillName"
          value={form.skillName}
          onChange={handleChange}
          placeholder="Skill Name (e.g., Python, English)"
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description / Notes"
          className="border p-2 rounded col-span-2"
        />

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          Add Skill
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Skills</h3>
      <ul className="mt-4 space-y-3">
        {skills.map((s) => (
          <li key={s._id} className="border p-4 flex justify-between items-start">
            <div>
              <p><strong>{s.skillName}</strong> ({s.category})</p>
              <p className="text-sm italic">{s.description}</p>
            </div>
            <button onClick={() => handleDelete(s._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
