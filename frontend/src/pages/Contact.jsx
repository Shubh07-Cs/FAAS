import React from 'react';

export const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-3xl font-bold mb-8 text-indigo-900">Contact Us</h2>
                    <form className="flex flex-col gap-6">

                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="relative">
                            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                            ></textarea>
                        </div>

                        <button className="w-full py-3 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 bg-gradient-to-r from-purple-800 to-indigo-600 hover:from-purple-900 hover:to-indigo-700">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right Side - Info */}
                <div className="w-full md:w-1/2 bg-gray-50 p-10 flex flex-col justify-center gap-8 border-l border-gray-100">

                    {/* Email Info */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Email</p>
                            <p className="text-lg font-medium text-gray-900">contactus@gmail.com</p>
                        </div>
                    </div>

                    {/* Phone Info */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Phone</p>
                            <p className="text-lg font-medium text-gray-900">+223-455-779</p>
                        </div>
                    </div>

                    {/* Address Info */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Address</p>
                            <p className="text-lg font-medium text-gray-900">395 Eth Street, Royalrock,<br />Canada, PA.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
