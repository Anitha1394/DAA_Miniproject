import React, { useState } from 'react';
import axios from 'axios';
import DressInputPage from './components/DressInputPage';
import DressDetailsPage from './components/DressDetailsPage';
import './styles.css'
const App = () => {
  const [numDresses, setNumDresses] = useState(0);
  const [inputDresses, setInputDresses] = useState([]); // This is where inputDresses is defined

  const handleDressNumSubmit = (num) => {
    setNumDresses(num);
  };

  const handleSubmit = (dresses) => {
    // Handle submission logic here
    console.log('Submitted dresses:', dresses);
    setInputDresses(dresses); // Update inputDresses state with submitted dresses
  };

  return (
    <div>
      {numDresses === 0 && <DressInputPage onSubmit={handleDressNumSubmit} />}
      {numDresses > 0 && <DressDetailsPage numDresses={numDresses} inputDresses={inputDresses} onSubmit={handleSubmit} />} {/* inputDresses is passed as a prop */}
    </div>
  );
};

export default App;
