// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Navigation */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/genesis" className="hover:text-white">Genesis NFT</Link>
        </div>

        {/* Branding */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} ChainProof™ — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
