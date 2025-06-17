import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function EducationForm() {
  const [form, setForm] = useState({
    degreeType: '',
    subject: '',
    university: '',
    from: '',
    to: '',
    cgpa: ''
  });
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  const fetchEducation = async () => {
    const res = await axiosInstance.get('/education');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/education', form);
      setMessage('Added successfully!');
      setForm({ degreeType: '', subject: '', university: '', from: '', to: '', cgpa: '' });
      fetchEducation();
    } catch (err) {
      setMessage('Failed to add.');
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/education/${id}`);
    fetchEducation();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Education</h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['degreeType', 'subject', 'university', 'from', 'to', 'Result'].map((field) => (
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
          Add
        </button>
      </form>

      <h3 className="mt-10 font-semibold text-lg">All Education Entries:</h3>
      <ul className="mt-4 space-y-2">
        {entries.map((edu) => (
          <li key={edu._id} className="border p-4 flex justify-between items-center">
            <div>
              <p><strong>{edu.degreeType}</strong> in {edu.subject} ({edu.from} – {edu.to})</p>
              <p>{edu.university} | Result: {edu.cgpa}</p>
            </div>
            <button
              onClick={() => handleDelete(edu._id)}
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
