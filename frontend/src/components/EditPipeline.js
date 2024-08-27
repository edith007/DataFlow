import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPipeline = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    useEffect(() => {
        // Fetch existing pipeline details to pre-populate the form
        axios.get(`/pipelines/${id}`)
            .then(response => {
                const pipeline = response.data;
                setName(pipeline.name);
                setDescription(pipeline.description);
                setSource(pipeline.source);
                setDestination(pipeline.destination);
            })
            .catch(error => console.error('Error fetching pipeline details:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPipeline = { name, description, source, destination };

        axios.put(`/pipelines/${id}`, updatedPipeline)
            .then(response => navigate(`/pipeline/${id}`))
            .catch(error => console.error('Error updating pipeline:', error));
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Pipeline</h1>
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
                    <input 
                        type="text" 
                        value={source} 
                        onChange={(e) => setSource(e.target.value)} 
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Destination</label>
                    <input 
                        type="text" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPipeline;
