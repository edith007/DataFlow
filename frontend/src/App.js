import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreatePipeline from './components/CreatePipeline';
import PipelineDetails from './components/PipelineDetails';
import EditPipeline from './components/EditPipeline';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pipeline" element={<Dashboard />} />
        <Route path="/create" element={<CreatePipeline />} />
        <Route path="/edit/:id" element={<EditPipeline />} />
        <Route path="/pipeline/:id" element={<PipelineDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
