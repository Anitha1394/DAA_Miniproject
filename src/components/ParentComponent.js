import React, { useState } from 'react';
import DressInputPage from './DressInputPage';
import DressDetailsPage from './DressDetailsPage';
import knapsack from '../knapsack'; // Import the knapsack algorithm implementation

const ParentComponent = () => {
  const [inputDresses, setInputDresses] = useState([]);
  const [optimizedDresses, setOptimizedDresses] = useState([]);

  // Function to handle submission of dress details
  const handleSubmit = (numDresses, dressDetails) => {
    // Process input dresses (e.g., filter, validate)
    setInputDresses(dressDetails);

    // Use knapsack algorithm to optimize selection of dresses
    const optimizedSelection = knapsack(dressDetails); // Implement knapsack algorithm
    setOptimizedDresses(optimizedSelection);
  };

  return (
    <div>
      <h1>Dress Selection</h1>
      <DressInputPage onSubmit={handleSubmit} />
      <DressDetailsPage
        numDresses={inputDresses.length}
        inputDresses={inputDresses}
        optimizedDresses={optimizedDresses}
      />
    </div>
  );
};

export default ParentComponent;