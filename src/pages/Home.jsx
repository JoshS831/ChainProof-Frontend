import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-green-400 mb-6 text-center">
        Welcome to ChainProof
      </h1>
      <p className="text-lg text-center max-w-2xl text-gray-300 mb-6">
        The blockchain shield for inventors, creators, and thinkers. 
        Instantly encrypt, register, and prove ownership of your ideas.
      </p>

      <img
        src="https://gateway.pinata.cloud/ipfs/QmXGenesisProofExampleHash" // Replace with your actual Genesis NFT
        alt="Genesis NFT"
        className="w-64 rounded-xl border border-green-500 mb-6"
      />

      <Link to="/dashboard">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-xl shadow-lg">
          Register My Idea →
        </button>
      </Link>

      <p className="mt-10 text-sm text-gray-400">
        Powered by Polygon • Encrypted with AES-256 • Minted Forever
      </p>
    </div>
  );
};

export default Home;
