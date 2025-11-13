const { Octokit } = require("@octokit/rest");
const operations = require("./handlers/operations");

/**
 * Initialize Octokit client with authentication token
 * @param {string} token - GitHub personal access token
 * @returns {Octokit} Initialized Octokit instance
 */
const initializeClient = (token) => {
  return new Octokit({
    auth: token,
    userAgent: 'monica-ai-github-skill v1.0.0',
    timeZone: 'UTC',
    baseUrl: 'https://api.github.com'
  });
};

/**
 * Handle incoming request for GitHub operations
 * @param {string} operation - The operation name to execute
 * @param {object} params - Parameters for the operation
 * @param {string} token - GitHub authentication token
 * @returns {Promise<object>} Result of the operation
 */
const handleRequest = async (operation, params, token) => {
  // Validate inputs
  if (!operation) {
    throw new Error('Operation name is required');
  }
  
  if (!token) {
    throw new Error('GitHub token is required for authentication');
  }
  
  const octokit = initializeClient(token);
  
  try {
    const handler = operations[operation];
    
    if (!handler) {
      const availableOps = Object.keys(operations).join(', ');
      throw new Error(
        `Operation '${operation}' not found. Available operations: ${availableOps}`
      );
    }
    
    // Sanitize operation name for logging to prevent format string issues
    const sanitizedOp = String(operation).replace(/[^\w-]/g, '_').substring(0, 100);
    console.log(`[${new Date().toISOString()}] Executing operation:`, sanitizedOp);
    
    const result = await handler(octokit, params || {});
    
    console.log(`[${new Date().toISOString()}] Operation completed successfully:`, sanitizedOp);
    
    return {
      success: true,
      operation,
      data: result
    };
  } catch (error) {
    // Sanitize operation name for logging
    const sanitizedOp = String(operation).replace(/[^\w-]/g, '_').substring(0, 100);
    console.error(`[${new Date().toISOString()}] Error in operation:`, sanitizedOp, error.message);
    
    return {
      success: false,
      operation,
      error: error.message,
      status: error.status || 500
    };
  }
};

module.exports = {
  handleRequest,
  initializeClient
};
