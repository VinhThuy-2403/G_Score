import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [status, setStatus] = useState('Đang kiểm tra...');

  useEffect(() => {
    api.get('/health')
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('Không kết nối được backend'));
  }, []);

  return <div>API status: {status}</div>;
}

export default App;