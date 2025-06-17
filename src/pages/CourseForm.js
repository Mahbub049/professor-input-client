import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function CourseForm() {
  const [form, setForm] = useState({ courseName: '', department: '', degree: '' });
  const [entries, setEntries] = useState([]);

  const fetchCourses = async () => {
    const res = await axiosInstance.get('/courses');
    setEntries(res.data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axiosInstance.post('/courses', form);
    setForm({ courseName: '', department: '', degree: '' });
    fetchCourses();
  };

  const handleDelete = async id => {
    await axiosInstance.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Courses Taught</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['courseName', 'department', 'degree'].map((field) => (
          <input key={field} name={field} value={form[field]} placeholder={field}
            className="w-full border p-2 rounded" onChange={handleChange} />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <ul className="mt-6 space-y-2">
        {entries.map(course => (
          <li key={course._id} className="border p-2 flex justify-between">
            <span>{course.courseName} ({course.degree}) - {course.department}</span>
            <button onClick={() => handleDelete(course._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
