const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const herbRoutes = require('./routes/herbRoutes');
const mixtureRoutes = require('./routes/mixtureRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Body parser for JSON data

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/herbs', herbRoutes);
app.use('/api/mixtures', mixtureRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 