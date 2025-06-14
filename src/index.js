const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set');
console.log('Database Name:', process.env.MONGODB_DATABASE);
console.log('Collection Name:', process.env.MONGODB_COLLECTION);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DATABASE,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  console.log('Connected to database:', mongoose.connection.db.databaseName);
  console.log('Available collections:', Object.keys(mongoose.connection.collections));
  
  // Log the first document in the collection to verify data
  mongoose.connection.collections[process.env.MONGODB_COLLECTION]
    .findOne()
    .then(doc => {
      console.log('Sample document structure:', doc ? Object.keys(doc) : 'No documents found');
    })
    .catch(err => console.error('Error fetching sample document:', err));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/rejections', require('./routes/rejections'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.db.databaseName,
    collections: Object.keys(mongoose.connection.collections),
    sampleDocument: mongoose.connection.collections[process.env.MONGODB_COLLECTION] ? 'Collection exists' : 'Collection not found'
  });
});

// Test endpoint to check environment variables
app.get('/env-test', (req, res) => {
  res.json({
    mongodb_uri: process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set',
    mongodb_database: process.env.MONGODB_DATABASE || 'Not set',
    mongodb_collection: process.env.MONGODB_COLLECTION || 'Not set'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 