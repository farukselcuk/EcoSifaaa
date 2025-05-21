const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const herbRoutes = require('./routes/herbRoutes');
const mixtureRoutes = require('./routes/mixtureRoutes');
const userRoutes = require('./routes/userRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const passport = require('passport');
const session = require('express-session');

// Load Passport config
require('./config/passport')(passport);

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Body parser for JSON data

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat', // Change this secret in production
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/herbs', herbRoutes);
app.use('/api/mixtures', mixtureRoutes);
app.use('/api/users', userRoutes);
app.use('/api/suggestions', suggestionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 