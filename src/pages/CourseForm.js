import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function CourseForm() {
  const [form, setForm] = useState({
    courseName: '',
    program: 'ICE',
    remarks: ''
  });
  const [entries, setEntries] = useState([]);

  const fetchCourses = async () => {
    const res = await axiosInstance.get('/courses');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/courses', form);
    setForm({ courseName: '', program: 'ICE', remarks: '' });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Courses Taught</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          placeholder="Course Name"
          className="border p-2 rounded"
        />

        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {['ICE', 'CSE', 'EEE', 'MBA', 'BBA', 'MICT'].map((program) => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>

        <textarea
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          placeholder="Additional Remarks (optional)"
          className="border p-2 rounded col-span-2"
        />

        <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">
          Add Course
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Courses</h3>
      <ul className="mt-4 space-y-2">
        {entries.map((course) => (
          <li key={course._id} className="border p-4 flex justify-between items-start">
            <div>
              <p><strong>{course.courseName}</strong> ({course.program})</p>
              {course.remarks && <p className="text-sm italic text-gray-600">Remarks: {course.remarks}</p>}
            </div>
            <button onClick={() => handleDelete(course._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
