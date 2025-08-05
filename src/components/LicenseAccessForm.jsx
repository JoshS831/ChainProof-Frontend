// src/components/LicenseAccessForm.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import LicensingABI from '../abi/LicensingABI.json';

const LicenseAccessForm = () => {
  const [licenseType, setLicenseType] = useState('standard');
  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState('');

  const contractAddress = import.meta.env.VITE_LICENSING_CONTRACT_ADDRESS;

  const licensePrices = {
    standard: ethers.utils.parseEther('0.1'), // 0.1 MATIC
    premium: ethers.utils.parseEther('0.25'),
    enterprise: ethers.utils.parseEther('0.5'),
  };

  const handlePurchase = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not detected');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, LicensingABI, signer);

      const tx = await contract.purchaseLicense(licenseType, { value: licensePrices[licenseType] });
      await tx.wait();
      setStatus(`✅ License (${licenseType}) purchased successfully.`);
    } catch (error) {
      console.error(error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Purchase License</h2>
      <select
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="standard">Standard - 0.1 MATIC</option>
        <option value="premium">Premium - 0.25 MATIC</option>
        <option value="enterprise">Enterprise - 0.5 MATIC</option>
      </select>
      <button
        onClick={handlePurchase}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Purchase License
      </button>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default LicenseAccessForm;
