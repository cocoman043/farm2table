import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registered successfully:', data);
                // TODO: redirect user to products page
            } else {
                setError(data.message || 'Failed to register.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-farmgreen">
            <div className="card bg-white shadow-xl max-w-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleRegister}>
                    {/* username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-bold" htmlFor="username">Username</label>
                        <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                        placeholder="John Doe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>
                    {/* email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-bold" htmlFor="email">Email Address</label>
                        <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                        placeholder="jdoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    {/* password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-bold" htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <p className="text-gray-400">Have account? <a href="/login" className="text-green-700 font-bold hover:underline">Log in</a> here.</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-farmgreen hover:text-black transition duration-300"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
