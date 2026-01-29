import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get('http://localhost:8000/attendance/');
            setLogs(res.data);
        } catch (error) {
            console.error("Failed to fetch logs", error);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Attendance Logs</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">User ID</th>
                            <th className="py-3 px-4 text-left">Timestamp</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{log.id}</td>
                                <td className="py-3 px-4">{log.user_id}</td>
                                <td className="py-3 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold">
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
