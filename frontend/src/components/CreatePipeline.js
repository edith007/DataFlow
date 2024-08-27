import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePipeline = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPipeline = { name, description, source, destination };
    axios.post('/pipelines', newPipeline)
      .then(response => {
        alert(`Pipeline ${response.data.name} created successfully!`);
        navigate('/pipelines');
      })
      .catch(error => {
        console.error('Error creating pipeline:', error);
        setErrorMessage('Error creating pipeline. Please check the details and try again.');
      });
  };

  const handleRunPipeline = (id) => {
    axios.post(`/pipelines/run/${id}`)
      .then(response => {
        alert('Pipeline is running successfully!');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(`Failed to run pipeline: ${error.response.data.error}`);
        } else {
          alert('Failed to run the pipeline. Please try again later.');
        }
        console.error('Error running pipeline:', error);
      });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <nav className="flex justify-between p-4 bg-blue-500 text-white">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/pipelines')}>Pipelines</button>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Create New Pipeline</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Source Type</label>
          <select 
            value={sourceType} 
            onChange={(e) => setSourceType(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Source Type</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="api">API Endpoint</option>
          </select>
        </div>
        <div>
          {sourceType === 'api' ? (
            <div>
              <label className="block text-sm font-medium">API Endpoint</label>
              <input 
                type="text" 
                value={source} 
                onChange={(e) => setSource(e.target.value)} 
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium">Source File</label>
              <input 
                type="file" 
                onChange={(e) => setSource(e.target.files[0]?.name || '')} 
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter PostgreSQL connection string"
            required
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Save Pipeline</button>
      </form>
    </div>
  );
};

export default CreatePipeline;
