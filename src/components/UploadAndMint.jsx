import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const UploadAndMint = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [minted, setMinted] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptFile = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => {
        const encrypted = CryptoJS.AES.encrypt(
          reader.result,
          import.meta.env.VITE_ENCRYPTION_PASSPHRASE || "default_pass"
        ).toString();
        resolve(encrypted);
      };
      reader.readAsText(file);
    });
  };

  const uploadToIPFS = async (encryptedText) => {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinataMetadata: { name: "ChainProofFile" },
        pinataContent: { encrypted: encryptedText },
      }),
    });

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  };

  const mintNFT = async (ipfsUrl) => {
    if (!window.ethereum) return alert("MetaMask not detected.");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const abi = [
      "function mintProofNFT(string memory metadataURI) public returns (uint256)"
    ];

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    const tx = await contract.mintProofNFT(ipfsUrl);
    await tx.wait();
    return true;
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setStatus("Encrypting...");
      const encrypted = await encryptFile(file);

      setStatus("Uploading to IPFS...");
      const url = await uploadToIPFS(encrypted);
      setIpfsUrl(url);

      setStatus("Minting NFT...");
      await mintNFT(url);

      setStatus("✅ Minted successfully!");
      setMinted(true);
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="bg-black text-green-400 p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ChainProof Dashboard</h2>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Encrypt + Upload + Mint
      </button>

      {status && <p className="mt-4">{status}</p>}
      {ipfsUrl && (
        <p className="mt-2 text-sm break-all">
          IPFS: <a href={ipfsUrl} target="_blank" rel="noreferrer">{ipfsUrl}</a>
        </p>
      )}
    </div>
  );
};

export default UploadAndMint;
