import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2'

export default function EducationForm() {
  const [form, setForm] = useState({
    degreeType: 'PhD',
    subject: '',
    university: '',
    passingYear: '',
    result: ''
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/education', form);
    Swal.fire({
      title: "Education Added!",
      text: "Information has been updated!",
      icon: "success"
    });
    setForm({ degreeType: 'PhD', subject: '', university: '', passingYear: '', result: '' });
    fetchEducation();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/education/${id}`);
    fetchEducation();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Education</h2>
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Degree Dropdown */}
        <select name="degreeType" value={form.degreeType} onChange={handleChange} className="border p-2 rounded">
          {['PhD', 'M.Phil', 'M.Sc', 'B.Sc', 'HSC', 'SSC'].map((deg) => (
            <option key={deg} value={deg}>{deg}</option>
          ))}
        </select>

        {/* Other Fields */}
        <input name="subject" value={form.subject} placeholder="Subject" onChange={handleChange} className="border p-2 rounded" />
        <input name="university" value={form.university} placeholder="University/Board" onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="passingYear" value={form.passingYear} placeholder="Year of Passing" onChange={handleChange} className="border p-2 rounded" />
        <input name="result" value={form.result} placeholder="Result (e.g. First Class)" onChange={handleChange} className="border p-2 rounded" />

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">Add</button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Education Entries</h3>
      <ul className="mt-4 space-y-2">
        {entries.map((edu) => (
          <li key={edu._id} className="border p-4 flex justify-between">
            <div>
              <p><strong>{edu.degreeType}</strong> in {edu.subject} ({edu.passingYear})</p>
              <p>{edu.university} | Result: {edu.result}</p>
            </div>
            <button onClick={() => handleDelete(edu._id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
