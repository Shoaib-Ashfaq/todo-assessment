import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="bg-white">
      <nav className="max-w-[2000px]  mx-auto shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">LOGO</div>
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
