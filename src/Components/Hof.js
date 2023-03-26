import { useNavigate } from 'react-router-dom';

const Hof = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  return children;
}

export default Hof;
