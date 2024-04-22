import React, { useState, useEffect } from 'react';
import knapsack from '../knapsack'; // Import the knapsack algorithm implementation
import '../styles.css'
const DressDetailsPage = ({ numDresses, inputDresses, onSubmit }) => {
  const initialDressDetails = Array(numDresses).fill({}); // Initialize with empty objects
  const [dressDetails, setDressDetails] = useState(initialDressDetails);
  const [optimizedDresses, setOptimizedDresses] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    // Call optimizeDresses when inputDresses and budget change
    const optimizeDresses = () => {
      if (!inputDresses) {
        return; // Return if inputDresses is undefined
      }

      // Extract relevant features from input dresses
      const dressItems = inputDresses.map(dress => ({
        value: dress.rating, // Use dress rating as value
        weight: dress.price // Use dress price as weight
      }));

      // Use knapsack algorithm to optimize dress selection
      const selectedDressIndices = knapsack(dressItems, budget);

      // Retrieve the optimized dresses based on selected indices
      const optimizedDresses = selectedDressIndices.map(index => inputDresses[index]);
      setOptimizedDresses(optimizedDresses);
    };

    optimizeDresses(); // Call optimizeDresses function
  }, [inputDresses, budget]); // Run effect whenever inputDresses or budget changes

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const updatedDetails = [...dressDetails];

    if (files && files.length > 0) {
      updatedDetails[index] = { ...updatedDetails[index], [name]: value, image: URL.createObjectURL(files[0]) };
    } else {
      updatedDetails[index] = { ...updatedDetails[index], [name]: value, image: null };
    }

    setDressDetails(updatedDetails);
  };

  const handleSubmit = () => {
    // Combine input dresses with optimized dresses
    const allDresses = [...dressDetails, ...optimizedDresses];
    // Process the combined list of dresses (e.g., display, save to database, etc.)
    onSubmit(allDresses);
  };

  const dressInputs = [];
  for (let i = 0; i < numDresses; i++) {
    dressInputs.push(
      <div key={i}>
        <h2>Dress {i + 1} Details:</h2>
        <input type="text" name="name" placeholder="Name" onChange={(e) => handleInputChange(i, e)} />
        <input type="text" name="color" placeholder="Color" onChange={(e) => handleInputChange(i, e)} />
        <input type="number" name="rating" placeholder="Rating" onChange={(e) => handleInputChange(i, e)} />
        <input type="number" name="price" placeholder="Price" onChange={(e) => handleInputChange(i, e)} />
        <input type="number" name="popularity" placeholder="Popularity" onChange={(e) => handleInputChange(i, e)} />
        <input type="file" name="image" onChange={(e) => handleInputChange(i, e)} accept="image/*" />
        {dressDetails[i] && dressDetails[i].image && (
          <img src={dressDetails[i].image} alt={`Dress ${i + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
        )}
      </div>
    );
  }

  const optimizedDressElements = optimizedDresses.map((dress, index) => (
    <div key={index}>
      <h2>Optimized Dress {index + 1}:</h2>
      <p>Name: {dress.name}</p>
      <p>Color: {dress.color}</p>
      <p>Rating: {dress.rating}</p>
      <p>Price: {dress.price}</p>
      <p>Popularity: {dress.popularity}</p>
      {dress.image && (
        <img src={dress.image} alt={`Optimized Dress ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
      )}
    </div>
  ));

  return (
    <div>
      <label htmlFor="budget">Budget:</label>
      <input type="number" id="budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
      {dressInputs}
      {optimizedDressElements}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DressDetailsPage;
