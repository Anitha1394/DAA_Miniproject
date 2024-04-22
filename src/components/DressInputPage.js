import React, { useState } from 'react';
import '../styles.css'
const DressInputPage = ({ onSubmit }) => {
  const [numDresses, setNumDresses] = useState(1);
  const [dressDetails, setDressDetails] = useState([]);

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const updatedDetails = [...dressDetails];
    
    if (files && files.length > 0) {
      updatedDetails[index] = { ...updatedDetails[index], [name]: value, image: files[0] };
    } else {
      updatedDetails[index] = { ...updatedDetails[index], [name]: value, image: null };
    }
    
    setDressDetails(updatedDetails);
  };

  const handleSubmit = () => {
    onSubmit(numDresses, dressDetails);
  };

  const addDress = () => {
    setNumDresses(numDresses + 1);
    setDressDetails([...dressDetails, {}]);
  };

  return (
    <div>
      <h2>Enter the number of dresses to consider:</h2>
      <input type="number" value={numDresses} onChange={(e) => setNumDresses(e.target.value)} />
      <button onClick={handleSubmit}>Next</button>

      
  
    </div>
  );
};

export default DressInputPage;