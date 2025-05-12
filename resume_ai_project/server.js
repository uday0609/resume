require('dotenv').config(); // ✅ Ensure environment variables are loaded first

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use('/users', userRoutes);
app.use('/resumes', resumeRoutes);
app.use('/jobs', jobRoutes);

// Default Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our application!' });
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});

// Handle Errors to Prevent Crashes
process.on('uncaughtException', (err) => {
    console.error('❌ Unhandled Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});