import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="bg-indigo-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Face Auth System</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-indigo-200">Register</Link>
                    <Link to="/attendance" className="hover:text-indigo-200">Mark Attendance</Link>
                    <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};
