import React, { useState } from 'react';
import axios from 'axios';
import { WebcamCapture } from '../components/WebcamCapture';

// Helper to convert base64 to file
const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCapture = (imageSrc) => {
        setImage(imageSrc);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Please capture your face firsz.");
            return;
        }

        setLoading(true);
        setMessage("");

        const file = dataURLtoFile(image, "face.jpg");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("file", file);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage("Registration successful!");
            setName('');
            setEmail('');
            setImage(null);
        } catch (error) {
            console.error(error);
            setMessage("Registration failed: " + (error.response?.data?.detail || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-8 text-indigo-900">New User Registration</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* User Icon SVG */}
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* Mail Icon SVG */}
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                                disabled={loading}
                            />
                        </div>

                        <p className="text-gray-600 mt-2">Please capture your photo on the right.</p>

                        {message && (
                            <div className={`p-3 rounded text-center text-sm font-medium ${message.includes("failed") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>

                {/* Right Side - Webcam */}
                <div className="w-full md:w-1/2 bg-gray-50 p-10 flex flex-col items-center justify-center border-l border-gray-100">
                    <div className="w-full max-w-sm">
                        <div className="relative group">
                            {/* Gradient Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden p-1">
                                {image ? (
                                    <img src={image} alt="Captured" className="w-full h-auto rounded-lg" />
                                ) : (
                                    // Custom styled webcam button
                                    <WebcamCapture
                                        onCapture={handleCapture}
                                        buttonText="Scan Face"
                                        disabled={loading}
                                        buttonClassName={`w-full mt-4 py-3 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 bg-gradient-to-r from-purple-600 to-indigo-600 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    />
                                )}
                            </div>
                        </div>

                        {image && (
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className={`flex-1 py-3 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 bg-gradient-to-r from-purple-600 to-indigo-600 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Registering...' : 'Register User'}
                                </button>
                                <button
                                    onClick={() => setImage(null)}
                                    disabled={loading}
                                    className="flex-1 py-3 text-gray-700 bg-white border border-gray-300 font-bold rounded-full shadow hover:bg-gray-50 transition"
                                >
                                    Retake
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
