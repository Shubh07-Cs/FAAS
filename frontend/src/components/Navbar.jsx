import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-800 to-indigo-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-3xl font-extrabold tracking-tight">Face Auth System</h1>
                <div className="space-x-8 text-lg font-bold tracking-wide">
                    <Link to="/" className="hover:text-purple-200 transition">Home</Link>
                    <Link to="/attendance" className="hover:text-purple-200 transition">Mark Attendance</Link>
                    <Link to="/dashboard" className="hover:text-purple-200 transition">Dashboard</Link>
                    <Link to="/contact" className="hover:text-purple-200 transition">Contact</Link>
                </div>
            </div>
        </nav>
    );
};
