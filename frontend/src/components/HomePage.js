import React from 'react';
import { Link } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const HomePage = () => {
  // Define some dummy nodes and edges
  const nodes = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
  ];

  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to DataFlow</h1>
      <p className="text-lg">Effortlessly manage your data pipelines.</p>
      <div className="h-64 w-full border mb-4">
        <ReactFlow nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="mt-8">
        <Link to="/pipeline" className="bg-blue-500 text-white px-6 py-2 rounded-md mr-4">View All Pipelines</Link>
        <Link to="/create" className="bg-green-500 text-white px-6 py-2 rounded-md">Create New Pipeline</Link>
      </div>
    </div>
  );
};

export default HomePage;
