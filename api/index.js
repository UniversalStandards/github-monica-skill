const { handleRequest } = require('../index');
const operations = require('../handlers/operations');

/**
 * Vercel Serverless Function handler
 * This function handles all HTTP requests when deployed to Vercel
 */
module.exports = async (req, res) => {
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check / Root endpoint
  if (req.method === 'GET' && req.url === '/') {
    return res.status(200).json({
      status: 'healthy',
      service: 'GitHub Monica Skill',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  }

  // List available operations endpoint
  if (req.method === 'GET' && req.url === '/operations') {
    try {
      const operationsList = Object.keys(operations).map(key => ({
        name: key,
        description: operations[key].description || 'No description available'
      }));
      
      return res.status(200).json({
        success: true,
        count: operationsList.length,
        operations: operationsList
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Execute operation endpoint
  if (req.method === 'POST' && req.url === '/execute') {
    const { operation, params } = req.body;
    const authHeader = req.headers.authorization;
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
      return res.status(statusCode).json(result);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }

  // 404 for all other requests
  return res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /operations',
      'POST /execute'
    ]
  });
};
