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

    const handleCapture = (imageSrc) => {
        setImage(imageSrc);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Please capture your face firsz.");
            return;
        }

        const file = dataURLtoFile(image, "face.jpg");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("file", file);

        try {
            await axios.post('http://localhost:8000/users/', formData, {
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
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">New User Registration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {image ? (
                            <div className="mt-4">
                                <p className="mb-2 text-green-600 font-semibold">Face Captured!</p>
                                <img src={image} alt="Captured" className="rounded-lg border mb-4" />
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    Register User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                                >
                                    Retake
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500">Please capture your photo on the right.</p>
                        )}

                        {message && <p className="mt-4 text-center font-bold text-red-500">{message}</p>}
                    </form>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                    {!image && <WebcamCapture onCapture={handleCapture} buttonText="Capture Face" />}
                </div>
            </div>
        </div>
    );
};
