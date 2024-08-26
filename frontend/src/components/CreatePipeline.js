import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePipeline = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPipeline = { name, description, source, destination };
    axios.post('/pipelines', newPipeline)
      .then(response => navigate('/'))
      .catch(error => console.error('Error creating pipeline:', error));
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
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
          <label className="block text-sm font-medium">Source</label>
          <select 
            value={source} 
            onChange={(e) => setSource(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Source</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Destination</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Save Pipeline</button>
      </form>
    </div>
  );
};

export default CreatePipeline;
