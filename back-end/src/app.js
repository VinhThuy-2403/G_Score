// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/v1', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint không tồn tại' });
});

// Global error handler (phải là middleware cuối cùng)
app.use(errorHandler);

module.exports = app;