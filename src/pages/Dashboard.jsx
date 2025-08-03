import UploadAndMint from "../components/UploadAndMint.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <Link to="/" className="text-sm text-green-400 mb-4 underline">
        ← Back to Home
      </Link>
      <UploadAndMint />
    </div>
  );
};

export default Dashboard;
