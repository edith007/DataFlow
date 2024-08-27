import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PipelineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pipeline, setPipeline] = useState(null);

  useEffect(() => {
    axios.get(`/pipelines/${id}`)
      .then(response => {
        setPipeline(response.data);
      })
      .catch(error => console.error('Error fetching pipeline details:', error));
  }, [id]);

  const runPipeline = () => {
    axios.post(`/pipelines/run/${id}`)
      .then(() => alert('Pipeline is running!'))
      .catch(error => {
        console.error('Error running pipeline:', error);
        alert('Failed to run the pipeline. Please try again later.');
      });
  };

  const deletePipeline = () => {
    if (window.confirm('Are you sure you want to delete this pipeline?')) {
      axios.delete(`/pipelines/${id}`)
        .then(() => {
          alert('Pipeline deleted successfully!');
          navigate('/pipeline');
        })
        .catch(error => {
          console.error('Error deleting pipeline:', error);
          alert('Failed to delete the pipeline. Please try again later.');
        });
    }
  };

  if (!pipeline) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <nav className="w-full flex justify-start p-4 bg-blue-500 text-white">
        <button onClick={() => navigate('/')} className="text-lg font-semibold">Home</button>
      </nav>
      <h1 className="text-4xl font-bold my-8">Pipeline Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <p className="text-xl mb-2"><strong>Name:</strong> {pipeline.name}</p>
        <p className="text-lg mb-2"><strong>Description:</strong> {pipeline.description}</p>
        <p className="text-lg mb-2"><strong>Source:</strong> {pipeline.source}</p>
        <p className="text-lg mb-2"><strong>Destination:</strong> {pipeline.destination}</p>
        <p className="text-lg mb-4"><strong>Status:</strong>
          <span className={`ml-2 px-3 py-1 rounded-full text-white ${
            pipeline.status === 'Running' ? 'bg-yellow-500' :
            pipeline.status === 'Completed' ? 'bg-green-500' :
            pipeline.status === 'Failed' ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {pipeline.status}
          </span>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={runPipeline}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
            Run Pipeline
          </button>
          <button
            onClick={() => navigate(`/edit/${pipeline.id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Pipeline
          </button>
          <button
            onClick={deletePipeline}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
            Delete Pipeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineDetails;
