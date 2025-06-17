import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function ProfileForm() {
    const [form, setForm] = useState({
        name: '',
        image: '',
        designation: '',
        address: '',
        email: '',
        phone: '',
        scopusId: '',
        orcidId: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/profile');
                if (res.data) {
                    setForm(res.data);
                }
            } catch (err) {
                console.log("No profile yet.");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/profile', form);
            setMessage('Profile saved successfully!');
        } catch (err) {
            setMessage('Error saving profile.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'designation', 'address', 'email', 'phone', 'scopusId', 'orcidId', 'image'].map((field) => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-2 border rounded"
                        value={form[field]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    Save Profile
                </button>
            </form>
        </div>
    );
}
