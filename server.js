const express = require('express');
const cors = require('cors');
const { handleRequest } = require('./index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'GitHub Monica Skill',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// List available operations
app.get('/operations', (req, res) => {
  try {
    const operations = require('./handlers/operations');
    const operationsList = Object.keys(operations).map(key => ({
      name: key,
      description: operations[key].description || 'No description available'
    }));
    
    res.json({
      success: true,
      count: operationsList.length,
      operations: operationsList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Main execution endpoint
app.post('/execute', async (req, res) => {
  const { operation, params } = req.body;
  const authHeader = req.headers.authorization;
  
  // Extract token from Authorization header
  const token = authHeader?.replace(/^Bearer\s+/i, '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No authorization token provided. Include "Authorization: Bearer YOUR_TOKEN" header.'
    });
  }
  
  if (!operation) {
    return res.status(400).json({
      success: false,
      error: 'Operation name is required in request body'
    });
  }
  
  try {
    const result = await handleRequest(operation, params, token);
    
    const statusCode = result.success ? 200 : (result.status || 500);
    res.status(statusCode).json(result);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /operations',
      'POST /execute'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ GitHub Monica Skill server running on port ${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/`);
    console.log(`✓ Operations list: http://localhost:${PORT}/operations`);
    console.log(`✓ Execute endpoint: POST http://localhost:${PORT}/execute`);
  });
}

module.exports = app;
