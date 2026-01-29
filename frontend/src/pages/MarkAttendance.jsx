import React, { useState } from 'react';
import axios from 'axios';
import { WebcamCapture } from '../components/WebcamCapture';

const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

export const MarkAttendance = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCapture = async (imageSrc) => {
        setLoading(true);
        setMessage("Verifying...");

        const file = dataURLtoFile(imageSrc, "attendance.jpg");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/attendance/mark`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // We assume the backend returns the user id or validation status
            setMessage(`Attendance Marked for ID: ${res.data.user_id}`);
        } catch (error) {
            console.error(error);
            setMessage("Verification failed: " + (error.response?.data?.detail || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold mb-8 text-indigo-700">Mark Attendance</h2>

            <div className="mb-6">
                <WebcamCapture onCapture={handleCapture} buttonText={loading ? "Processing..." : "Scan Face"} disabled={loading} />
            </div>

            {message && (
                <div className={`p-4 rounded-lg shadow-lg text-xl font-bold ${message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {message}
                </div>
            )}
        </div>
    );
};
