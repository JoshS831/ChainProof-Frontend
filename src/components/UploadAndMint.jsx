import React, { useState } from 'react';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const UploadAndMint = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');

  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  const CONTRACT_ABI = [
    {
      "inputs": [
        { "internalType": "string", "name": "title", "type": "string" },
        { "internalType": "string", "name": "description", "type": "string" },
        { "internalType": "string", "name": "ipfsUrl", "type": "string" }
      ],
      "name": "mintProofNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
      setStatus('❌ Wallet connection failed.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptAndUpload = async () => {
    if (!file || !title || !description) {
      return setStatus('❌ Please fill out all fields and select a file.');
    }

    try {
      setStatus('🔐 Encrypting and uploading...');

      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const encrypted = CryptoJS.AES.encrypt(content, import.meta.env.VITE_ENCRYPTION_KEY).toString();

        const blob = new Blob([encrypted], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', blob, 'encrypted.txt');

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        });

        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        setStatus(`✅ Uploaded to IPFS: ${ipfsUrl}`);

        await mintNFT(ipfsUrl);
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
      setStatus('❌ Upload failed.');
    }
  };

  const mintNFT = async (ipfsUrl) => {
    try {
      if (!walletAddress) return setStatus('❌ Connect your wallet first.');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setStatus('⛏️ Minting NFT...');
      const tx = await contract.mintProofNFT(title, description, ipfsUrl);
      await tx.wait();

      setStatus('✅ NFT minted successfully!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Minting failed.');
    }
  };

  return (
    <div className="bg-black text-green-400 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-xl mb-4 font-bold">🔗 Upload & Mint ChainProof</h2>

      <input type="file" onChange={handleFileChange} className="mb-4 block w-full" />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2 px-2 py-1 w-full text-black" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 px-2 py-1 w-full text-black" />

      <button onClick={encryptAndUpload} className="bg-green-700 px-4 py-2 rounded text-white mr-2">Mint NFT</button>
      <button onClick={connectWallet} className="bg-blue-600 px-4 py-2 rounded text-white">Connect Wallet</button>

      <div className="mt-4 text-sm">{walletAddress && <>🔓 Connected: {walletAddress}</>}</div>
      <div className="mt-2">{status}</div>
    </div>
  );
};

export default UploadAndMint;
