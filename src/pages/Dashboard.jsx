import React from "react";
import { Link } from "react-router-dom";
import UploadAndMint from "../components/UploadAndMint";
import DonateWidget from "../components/DonateWidget";
import LicenseAccessForm from "../components/LicenseAccessForm";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto space-y-12 flex-grow p-6">

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-purple-400 drop-shadow-md">
            ChainProof Dashboard
          </h1>
          <Link to="/genesis" className="text-purple-400 underline">
            View the Genesis NFT
          </Link>
        </div>

        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-purple-500">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">
            Purchase Access License
          </h2>
          <LicenseAccessForm />
        </div>

        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-teal-500">
          <h2 className="text-2xl font-semibold mb-4 text-teal-300">
            Upload and Mint Proof
          </h2>
          <UploadAndMint />
        </div>

        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-yellow-500">
          <DonateWidget />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
