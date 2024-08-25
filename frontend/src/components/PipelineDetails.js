import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PipelineDetails = () => {
  const { id } = useParams();
  const [pipeline, setPipeline] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/pipelines/${id}`)
      .then(response => setPipeline(response.data))
      .catch(error => console.error('Error fetching pipeline details:', error));
  }, [id]);

  const deletePipeline = () => {
    axios.delete(`/api/pipelines/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting pipeline:', error));
  };

  const runPipeline = () => {
    axios.post('/api/pipelines/run', { id })  // Corrected the string quote here
      .then(() => console.log('Pipeline running'))
      .catch(error => console.error('Error running pipeline:', error));
  };

  if (!pipeline) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Pipeline Details</h1>
      <p><strong>Name:</strong> {pipeline.name}</p>
      <p><strong>Description:</strong> {pipeline.description}</p>
      <p><strong>Source:</strong> {pipeline.source}</p>
      <p><strong>Destination:</strong> {pipeline.destination}</p>
      <div className="mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4" onClick={runPipeline}>Run Pipeline</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={deletePipeline}>Delete Pipeline</button>
      </div>
    </div>
  );
};

export default PipelineDetails;
