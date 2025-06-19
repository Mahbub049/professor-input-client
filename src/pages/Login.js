import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Swal.fire({
                title: "Login Sucessful",
                text: "Information has been updated!",
                icon: "success"
            });
            // Redirect to dashboard later
        } catch (err) {
            setError(err.message);
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch('https://professor-input-server-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token }),
        });

        const data = await response.json();
        if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            navigate('/dashboard/profile');
            // redirect later
        } else {
            setError("JWT Token not received");
        }




    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
