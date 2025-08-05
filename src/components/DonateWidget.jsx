// src/components/DonateWidget.jsx

import React, { useState } from 'react';

export default function DonateWidget() {
  const [copied, setCopied] = useState(false);

  const donationAddress = '0x83A286A55b6e1aa6d58e94b39897f2d92D6580B9'; // Replace with final donation wallet

  const handleCopy = () => {
    navigator.clipboard.writeText(donationAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black border border-purple-600 rounded-xl p-6 w-full max-w-xl mx-auto mt-10 text-white text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Support ChainProof</h2>
      <p className="mb-4">
        Donations help us protect inventors and creators by keeping the ChainProof platform open and growing.
      </p>
      <div className="bg-gray-800 p-4 rounded-md text-sm mb-2 select-all">
        {donationAddress}
      </div>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-md text-white font-semibold"
      >
        {copied ? 'Copied!' : 'Copy Wallet Address'}
      </button>
    </div>
  );
}
