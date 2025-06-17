import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function ExperienceForm() {
  const [form, setForm] = useState({
    designation: 'Professor',
    department: '',
    institution: '',
    address: '',
    from: '',
    to: '',
    remarks: ''
  });
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [entries, setEntries] = useState([]);

  const fetchExperience = async () => {
    const res = await axiosInstance.get('/experience');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = () => {
    setIsCurrentlyWorking(!isCurrentlyWorking);
    if (!isCurrentlyWorking) {
      setForm({ ...form, to: 'Present' });
    } else {
      setForm({ ...form, to: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/experience', form);
    setForm({
      designation: 'Professor',
      department: '',
      institution: '',
      address: '',
      from: '',
      to: '',
      remarks: ''
    });
    setIsCurrentlyWorking(false);
    fetchExperience();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/experience/${id}`);
    fetchExperience();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Experience</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="designation" value={form.designation} onChange={handleChange} className="border p-2 rounded">
          {['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'].map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>

        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
        <input name="institution" value={form.institution} onChange={handleChange} placeholder="Institution" className="border p-2 rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
        <input type="date" name="from" value={form.from} onChange={handleChange} className="border p-2 rounded" />

        {/* To Field with Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="date"
            name="to"
            value={isCurrentlyWorking ? '' : form.to}
            onChange={handleChange}
            disabled={isCurrentlyWorking}
            className="border p-2 rounded flex-1"
          />
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isCurrentlyWorking}
              onChange={handleCheckbox}
              className="mr-1"
            />
            Currently Working
          </label>
        </div>

        <textarea
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          placeholder="Remarks (optional)"
          className="border p-2 rounded col-span-2"
        />

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          Add Experience
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">Experience History</h3>
      <ul className="mt-4 space-y-3">
        {entries.map((exp) => (
          <li key={exp._id} className="border p-4 flex justify-between items-start">
            <div>
              <p><strong>{exp.designation}</strong> at {exp.institution}</p>
              <p>{exp.department} | {exp.address}</p>
              <p>{exp.from} – {exp.to}</p>
              {exp.remarks && <p className="italic text-sm text-gray-600">Remarks: {exp.remarks}</p>}
            </div>
            <button onClick={() => handleDelete(exp._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
