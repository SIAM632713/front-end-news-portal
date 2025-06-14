import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#111827] text-gray-300">
            <div className="max-w-[1400px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Header Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">About Us</h3>
                    <p className="text-sm leading-6">
                        We are committed to delivering the best service and information.
                        Our mission is to enrich lives through exceptional digital experiences.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/news-article" className="hover:underline">News Articles</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm">1234 Street Name, City, Country</p>
                    <p className="text-sm">Email: info@example.com</p>
                    <p className="text-sm">Phone: +91 234 567 890</p>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 mt-6">
                <div className="max-w-[1400px] mx-auto px-4 py-6 text-center text-sm space-y-2">
                    <p className="text-gray-400">Follow us on:</p>
                    <div className="space-x-4 text-gray-400">
                        <a href="#" className="hover:underline">Facebook</a>
                        <a href="#" className="hover:underline">Twitter</a>
                        <a href="#" className="hover:underline">LinkedIn</a>
                        <a href="#" className="hover:underline">Instagram</a>
                    </div>
                    <p className="text-gray-500 mt-2">© 2024 Morning Dispatch. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;