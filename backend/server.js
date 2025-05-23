const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const herbRoutes = require('./routes/herbRoutes');
const mixtureRoutes = require('./routes/mixtureRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const authRoutes = require('./routes/auth');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/herbs', herbRoutes);
app.use('/api/mixtures', mixtureRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 