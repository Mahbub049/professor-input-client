import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/protected');
        setMessage(res.data.message);
      } catch (err) {
        setMessage('Access denied');
      }
    };
    getData();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
