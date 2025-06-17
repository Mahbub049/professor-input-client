import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ReactPaginate from 'react-paginate'; 

export default function PublicationForm() {
  const [form, setForm] = useState({
    category: 'journal',
    authors: '',
    title: '',
    source: '',
    year: '',
    doi: '',
    location: '',
    chapterTitle: '',
    isbn: '',
    publisher: ''
  });
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('journal');
const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 10;

// Filtered data by active tab
const filtered = entries.filter(pub => pub.category === activeTab);

// Paginated data
const offset = currentPage * itemsPerPage;
const currentItems = filtered.slice(offset, offset + itemsPerPage);
const pageCount = Math.ceil(filtered.length / itemsPerPage);

const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};

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
      doi: '',
      location: '',
      chapterTitle: '',
      isbn: '',
      publisher: ''
    });
    fetchPublications();
  };

  const handleDelete = async id => {
    await axiosInstance.delete(`/publications/${id}`);
    fetchPublications();
  };

  const renderConditionalFields = () => {
    switch (form.category) {
      case 'conference':
        return (
          <>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </>
        );
      case 'book':
        return (
          <>
            <input
              name="chapterTitle"
              placeholder="Chapter Title (optional)"
              value={form.chapterTitle}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="publisher"
              placeholder="Publisher"
              value={form.publisher}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="isbn"
              placeholder="ISBN (optional)"
              value={form.isbn}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Publication</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        >
          <option value="journal">Journal</option>
          <option value="conference">Conference</option>
          <option value="book">Book / Chapter</option>
        </select>

        {/* Common Fields */}
        <input
          name="authors"
          placeholder="Authors"
          value={form.authors}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="source"
          placeholder={form.category === 'journal' ? 'Journal Name' : form.category === 'conference' ? 'Conference Name' : 'Book Title'}
          value={form.source}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="doi"
          placeholder="DOI"
          value={form.doi}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Conditional Fields */}
        {renderConditionalFields()}

        <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">
          Add Publication
        </button>
      </form>

      <h3 className="mt-8 font-semibold text-lg">All Publications</h3>

          {/* Tabs */}
    <div className="flex justify-center mt-8 space-x-4">
      {['journal', 'conference', 'book'].map(type => (
        <button
          key={type}
          onClick={() => {
            setActiveTab(type);
            setCurrentPage(0); // reset page
          }}
          className={`px-4 py-2 rounded ${activeTab === type ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}s
        </button>
      ))}
    </div>

          {/* Publications List */}
    <ul className="mt-6 space-y-3">
      {currentItems.map(pub => (
        <li key={pub._id} className="border p-4 shadow-sm">
          <p><strong>{pub.title}</strong> – {pub.source} ({pub.year})</p>
          <p className="text-sm text-gray-600">By: {pub.authors}</p>
          <p className="text-sm">DOI: {pub.doi || 'N/A'}</p>
          {pub.location && <p className="text-sm">Location: {pub.location}</p>}
          {pub.chapterTitle && <p className="text-sm">Chapter: {pub.chapterTitle}</p>}
          {pub.publisher && <p className="text-sm">Publisher: {pub.publisher}</p>}
          {pub.isbn && <p className="text-sm">ISBN: {pub.isbn}</p>}
          <button onClick={() => handleDelete(pub._id)} className="text-red-500 mt-1">Delete</button>
        </li>
      ))}
    </ul>

    {/* Pagination */}
    {pageCount > 1 && (
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2"}
          pageClassName={"px-3 py-1 border rounded"}
          activeClassName={"bg-green-600 text-white"}
        />
      </div>
    )}
    </div>
  );
}
