import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreatePipeline from './components/CreatePipeline';
import PipelineDetails from './components/PipelineDetails';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreatePipeline />} />
          <Route path="/pipeline/:id" element={<PipelineDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
