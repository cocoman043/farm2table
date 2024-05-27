import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Logged in successfully:', data);
                // TODO: redirect user to products page
            } else {
                setError(data.message || 'Failed to log in.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-farmgreen">
            <div className="card bg-white shadow-xl max-w-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin}>
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
                        <p className="text-gray-400">No account? <a href="/register" className="text-green-700 font-bold hover:underline">Sign up</a> here.</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-farmgreen hover:text-black transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
