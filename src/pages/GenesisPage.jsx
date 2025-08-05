import React from "react";
import { Link } from "react-router-dom";
import genesisNft from "../assets/genesis.png"; // Replace with actual path
import Footer from "../components/Footer";

export default function GenesisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="flex-grow flex flex-col items-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          ChainProof Genesis NFT
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl text-center">
          The ChainProof Genesis NFT is our declaration of purpose — the first immutable proof on-chain to protect ideas, inventions, and originality.
        </p>
        <img
          src={genesisNft}
          alt="ChainProof Genesis NFT"
          className="w-full max-w-md rounded-xl shadow-xl mb-6 border border-white"
        />
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white rounded-full text-lg font-semibold shadow-md transition duration-200"
        >
          Back to Dashboard
        </Link>
      </div>

      <Footer />
    </div>
  );
}
