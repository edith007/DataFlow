import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/pipelines')
      .then(response => setPipelines(response.data))
      .catch(error => console.error('Error fetching pipelines:', error));

    const socket = io();

    socket.on('pipeline_status', (update) => {
      setPipelines(prevPipelines => 
        prevPipelines.map(pipeline => 
          pipeline.id === update.pipeline_id 
            ? { ...pipeline, status: update.status } 
            : pipeline
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const deletePipeline = (id) => {
    axios.delete(`/pipelines/${id}`)
      .then(() => setPipelines(pipelines.filter(pipeline => pipeline.id !== id)))
      .catch(error => console.error('Error deleting pipeline:', error));
  };

  const runPipeline = (id) => {
    axios.post(`/pipelines/run/${id}`)
      .then(() => console.log('Pipeline running'))
      .catch(error => console.error('Error running pipeline:', error));
  };

  return (
    <div>
      <nav className="flex justify-between p-4 bg-blue-500 text-white">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/pipeline')}>Pipelines</button>
      </nav>
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
                <p>Status: 
                  <span className={`ml-2 px-2 py-1 rounded text-white ${
                    pipeline.status === 'Running' ? 'bg-yellow-500' :
                    pipeline.status === 'Completed' ? 'bg-green-500' :
                    pipeline.status === 'Failed' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                    {pipeline.status}
                  </span>
                </p>
                <p>Last Run: {pipeline.last_run}</p>
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
