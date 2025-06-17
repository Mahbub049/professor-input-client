import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function PublicationForm() {
  const [form, setForm] = useState({
    category: 'journal',
    authors: '',
    title: '',
    source: '',
    year: '',
    doi: ''
  });
  const [entries, setEntries] = useState([]);

  const fetchPublications = async () => {
    const res = await axiosInstance.get('/publications');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/publications', form);
    setForm({
      category: 'journal',
      authors: '',
      title: '',
      source: '',
      year: '',
      doi: ''
    });
    fetchPublications();
  };

  const handleDelete = async id => {
    await axiosInstance.delete(`/publications/${id}`);
    fetchPublications();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Publication</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded col-span-2">
          <option value="journal">Journal</option>
          <option value="book">Book</option>
          <option value="conference">Conference</option>
        </select>
        {['authors', 'title', 'source', 'year', 'doi'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">
          Add Publication
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Publications</h3>
      <ul className="mt-4 space-y-2">
        {entries.map((pub) => (
          <li key={pub._id} className="border p-3 flex justify-between">
            <div>
              <p><strong>{pub.category.toUpperCase()}:</strong> {pub.title} – {pub.source} ({pub.year})</p>
              <p><small>By: {pub.authors} | DOI: {pub.doi || 'N/A'}</small></p>
            </div>
            <button onClick={() => handleDelete(pub._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
