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
    <div className="min-h-screen flex flex-col items-center justify-start">
      <nav className="w-full flex justify-start p-4 bg-blue-500 text-white">
        <button onClick={() => navigate('/')} className="text-lg font-semibold">Home</button>
      </nav>
      <h1 className="text-4xl font-bold my-8">Pipeline Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
        {pipelines.length === 0 ? (
          <p className="text-xl">No pipelines available.</p>
        ) : (
          pipelines.map(pipeline => (
            <div key={pipeline.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-semibold mb-2">{pipeline.name}</h2>
              <p className="mb-1">Status:
                <span className={`ml-2 px-3 py-1 rounded-full text-white ${
                  pipeline.status === 'Running' ? 'bg-yellow-500' :
                  pipeline.status === 'Completed' ? 'bg-green-500' :
                  pipeline.status === 'Failed' ? 'bg-red-500' : 'bg-gray-500'
                }`}>
                  {pipeline.status}
                </span>
              </p>
              <p className="mb-4">Last Run: {pipeline.last_run}</p>
              <div className="flex space-x-4">
                <Link to={`/pipeline/${pipeline.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg">View</Link>
                <button onClick={() => deletePipeline(pipeline.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg">Delete</button>
                <button onClick={() => runPipeline(pipeline.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg">Run</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
