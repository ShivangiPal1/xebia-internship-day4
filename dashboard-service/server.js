require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notFound = require('./middleware/notFound');

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'dashboard-service', status: 'ok' });
});

app.use('/api/dashboard', dashboardRoutes);
app.use(notFound);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Dashboard service running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
