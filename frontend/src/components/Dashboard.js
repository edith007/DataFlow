import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    axios.get('/api/pipelines')
      .then(response => setPipelines(response.data))
      .catch(error => console.error('Error fetching pipelines:', error));
  }, []);

  const deletePipeline = (id) => {
    axios.delete(`/api/pipelines/${id}`)
      .then(() => setPipelines(pipelines.filter(pipeline => pipeline.id !== id)))
      .catch(error => console.error('Error deleting pipeline:', error));
  };

  const runPipeline = (id) => {
    axios.post('/api/pipelines/run', { id })
      .then(() => console.log('Pipeline running'))
      .catch(error => console.error('Error running pipeline:', error));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Pipeline Dashboard</h1>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create New Pipeline</Link>
      <div className="mt-4">
        {pipelines.length === 0 ? (
          <p>No pipelines available.</p>
        ) : (
          <ul>
            {pipelines.map(pipeline => (
              <li key={pipeline.id} className="border p-4 mb-2">
                <h2 className="text-xl font-semibold">{pipeline.name}</h2>
                <p>Status: {pipeline.status}</p>
                <p>Last Run: {pipeline.last_run_time}</p>
                <div className="mt-2">
                  <Link to={`/pipeline/${pipeline.id}`} className="text-blue-500 mr-4">View</Link>
                  <button className="text-red-500 mr-4" onClick={() => deletePipeline(pipeline.id)}>Delete</button>
                  <button className="text-green-500" onClick={() => runPipeline(pipeline.id)}>Run</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
