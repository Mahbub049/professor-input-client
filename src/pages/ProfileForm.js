import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function ProfileForm() {
    const [form, setForm] = useState({
        name: '',
        image: '',
        designation: '',
        organization: '',
        phones: [''],
        emails: [''],
        googleScholar: '',
        researchGate: '',
        interests: ['']
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/profile');
                if (res.data) setForm(res.data);
            } catch (err) {
                console.log("No profile yet.");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (name, index, value) => {
        const updated = [...form[name]];
        updated[index] = value;
        setForm({ ...form, [name]: updated });
    };

    const addField = (name) => {
        setForm({ ...form, [name]: [...form[name], ''] });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axiosInstance.post('/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setForm({ ...form, image: res.data.imageUrl }); // ✅ This should now be a full Cloudinary URL
        } catch (err) {
            console.error('❌ Image upload failed', err);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting form:", form);
            await axiosInstance.post('/profile', form);
            setMessage('Profile saved successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Error saving profile.');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Full Name" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} />
                <input name="designation" placeholder="Designation" className="w-full p-2 border rounded" value={form.designation} onChange={handleChange} />
                <input name="organization" placeholder="Organization" className="w-full p-2 border rounded" value={form.organization} onChange={handleChange} />

                <div>
                    <label className="font-semibold">Upload Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded w-full" />
                    {form.image && <img src={form.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
                </div>


                <div>
                    <label className="font-semibold">Contact Numbers:</label>
                    {form.phones.map((phone, i) => (
                        <input key={i} className="w-full p-2 border rounded my-1" value={phone} onChange={e => handleArrayChange('phones', i, e.target.value)} />
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => addField('phones')}>+ Add Phone</button>
                </div>

                <div>
                    <label className="font-semibold">Emails:</label>
                    {form.emails.map((email, i) => (
                        <input key={i} className="w-full p-2 border rounded my-1" value={email} onChange={e => handleArrayChange('emails', i, e.target.value)} />
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => addField('emails')}>+ Add Email</button>
                </div>

                <input name="googleScholar" placeholder="Google Scholar URL" className="w-full p-2 border rounded" value={form.googleScholar} onChange={handleChange} />
                <input name="researchGate" placeholder="ResearchGate URL" className="w-full p-2 border rounded" value={form.researchGate} onChange={handleChange} />

                <div>
                    <label className="font-semibold">Research Interests:</label>
                    {form.interests.map((interest, i) => (
                        <input key={i} className="w-full p-2 border rounded my-1" value={interest} onChange={e => handleArrayChange('interests', i, e.target.value)} />
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => addField('interests')}>+ Add Interest</button>
                </div>

                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save Profile</button>
            </form>
        </div>
    );
}
