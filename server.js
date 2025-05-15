// server.js
require('dotenv').config(); // Load environment variables first

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const analyzeRouter = require('./routes/analyze');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/analyze', analyzeRouter);

app.get('/', (req, res) => {
  res.send('Hello from server!!');
});

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

  const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})