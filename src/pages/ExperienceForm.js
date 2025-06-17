import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function ExperienceForm() {
  const [form, setForm] = useState({
    designation: '',
    department: '',
    university: '',
    faculty: '',
    address: '',
    from: '',
    to: ''
  });
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  const fetchExperience = async () => {
    const res = await axiosInstance.get('/experience');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/experience', form);
      setMessage('Experience added successfully!');
      setForm({
        designation: '',
        department: '',
        university: '',
        faculty: '',
        address: '',
        from: '',
        to: ''
      });
      fetchExperience();
    } catch {
      setMessage('Failed to save.');
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/experience/${id}`);
    fetchExperience();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Experience</h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['designation', 'department', 'university', 'faculty', 'address', 'from', 'to'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="p-2 border rounded"
            value={form[field]}
            onChange={handleChange}
          />
        ))}
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded">
          Add Experience
        </button>
      </form>

      <h3 className="mt-10 font-semibold text-lg">Experience History</h3>
      <ul className="mt-4 space-y-3">
        {entries.map((exp) => (
          <li key={exp._id} className="border p-4 flex justify-between items-center">
            <div>
              <p><strong>{exp.designation}</strong> - {exp.university}</p>
              <p>{exp.department} | {exp.faculty}</p>
              <p>{exp.address}</p>
              <p>{exp.from} - {exp.to}</p>
            </div>
            <button
              onClick={() => handleDelete(exp._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
