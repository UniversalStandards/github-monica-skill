/**
 * Gist operations module
 * Handles all GitHub gist-related operations
 */

module.exports = {
  /**
   * List gists for the authenticated user
   */
  list: async (octokit, params) => {
    const { data } = await octokit.gists.list({
      since: params.since,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Get a specific gist
   */
  get: async (octokit, params) => {
    if (!params.gist_id) {
      throw new Error('gist_id parameter is required');
    }
    
    const { data } = await octokit.gists.get({
      gist_id: params.gist_id
    });
    return data;
  },

  /**
   * Create a new gist
   */
  create: async (octokit, params) => {
    if (!params.files) {
      throw new Error('files parameter is required');
    }
    
    const { data } = await octokit.gists.create({
      description: params.description || '',
      public: params.public !== false,
      files: params.files
    });
    return data;
  },

  /**
   * Update an existing gist
   */
  update: async (octokit, params) => {
    if (!params.gist_id) {
      throw new Error('gist_id parameter is required');
    }
    
    const updateData = {};
    if (params.description !== undefined) updateData.description = params.description;
    if (params.files) updateData.files = params.files;
    
    const { data } = await octokit.gists.update({
      gist_id: params.gist_id,
      ...updateData
    });
    return data;
  },

  /**
   * Delete a gist
   */
  delete: async (octokit, params) => {
    if (!params.gist_id) {
      throw new Error('gist_id parameter is required');
    }
    
    await octokit.gists.delete({
      gist_id: params.gist_id
    });
    return { success: true, message: 'Gist deleted' };
  }
};
