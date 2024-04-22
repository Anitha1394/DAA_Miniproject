const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const knapsack = require('./knapsack'); // Assuming you have a separate file for knapsack algorithm implementation

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/optimize-dresses', upload.array('images', 5), (req, res) => {
  const dressDetails = req.body;
  const dressImages = req.files;

  // Combine dress details with file paths of uploaded images
  const dressesWithImages = dressDetails.map((dress, index) => ({
    ...dress,
    image: dressImages[index].path // Assuming the images are stored in the 'uploads' directory
  }));

  // Calculate optimal dress selection using knapsack algorithm
  // Here you'll pass 'dressesWithImages' to the knapsack algorithm

  // Send the selected dresses (including their images) as a response
  res.json({ selectedDresses });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
