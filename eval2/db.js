const mongoose = require('mongoose');

// MongoDB connection URI (replace with your MongoDB URI if using Atlas)
const mongoURI = 'mongodb://localhost:27017/backend-sed';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the connection
module.exports = mongoose;