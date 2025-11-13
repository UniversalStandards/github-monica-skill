/**
 * File operations module
 * Handles all GitHub file-related operations
 */

module.exports = {
  /**
   * Get file content from a repository
   */
  get: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.path) {
      throw new Error('owner, repo, and path parameters are required');
    }
    
    const { data } = await octokit.repos.getContent({
      owner: params.owner,
      repo: params.repo,
      path: params.path,
      ref: params.ref
    });
    
    // Decode content if it's a file
    if (data.type === 'file' && data.content) {
      data.decoded_content = Buffer.from(data.content, 'base64').toString('utf-8');
    }
    
    return data;
  },

  /**
   * Create a new file in a repository
   */
  create: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.path || !params.content) {
      throw new Error('owner, repo, path, and content parameters are required');
    }
    
    if (!params.message) {
      throw new Error('commit message is required');
    }
    
    // Encode content to base64
    const encodedContent = Buffer.from(params.content, 'utf-8').toString('base64');
    
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: params.owner,
      repo: params.repo,
      path: params.path,
      message: params.message,
      content: encodedContent,
      branch: params.branch,
      committer: params.committer,
      author: params.author
    });
    return data;
  },

  /**
   * Update an existing file in a repository
   */
  update: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.path || !params.content) {
      throw new Error('owner, repo, path, and content parameters are required');
    }
    
    if (!params.message) {
      throw new Error('commit message is required');
    }
    
    if (!params.sha) {
      throw new Error('sha parameter is required for updating files');
    }
    
    // Encode content to base64
    const encodedContent = Buffer.from(params.content, 'utf-8').toString('base64');
    
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: params.owner,
      repo: params.repo,
      path: params.path,
      message: params.message,
      content: encodedContent,
      sha: params.sha,
      branch: params.branch,
      committer: params.committer,
      author: params.author
    });
    return data;
  },

  /**
   * Delete a file from a repository
   */
  delete: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.path || !params.sha) {
      throw new Error('owner, repo, path, and sha parameters are required');
    }
    
    if (!params.message) {
      throw new Error('commit message is required');
    }
    
    const { data } = await octokit.repos.deleteFile({
      owner: params.owner,
      repo: params.repo,
      path: params.path,
      message: params.message,
      sha: params.sha,
      branch: params.branch,
      committer: params.committer,
      author: params.author
    });
    return data;
  },

  /**
   * List files in a directory
   */
  list: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.getContent({
      owner: params.owner,
      repo: params.repo,
      path: params.path || '',
      ref: params.ref
    });
    
    // Return array of files/directories
    return Array.isArray(data) ? data : [data];
  }
};
