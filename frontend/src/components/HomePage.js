import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to DataFlow</h1>
      <p className="text-lg">Effortlessly manage your data pipelines.</p>
      <div className="mt-8">
        <Link to="/pipeline" className="bg-blue-500 text-white px-6 py-2 rounded-md mr-4">View All Pipelines</Link>
        <Link to="/create" className="bg-green-500 text-white px-6 py-2 rounded-md">Create New Pipeline</Link>
      </div>
    </div>
  );
};

export default HomePage;
