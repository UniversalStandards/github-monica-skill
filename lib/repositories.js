/**
 * Repository operations module
 * Handles all GitHub repository-related operations
 */

module.exports = {
  /**
   * List repositories for the authenticated user or a specific user
   */
  list: async (octokit, params) => {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      visibility: params.visibility,
      affiliation: params.affiliation,
      type: params.type || 'all',
      sort: params.sort || 'updated',
      direction: params.direction || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Get details of a specific repository
   */
  get: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.get({
      owner: params.owner,
      repo: params.repo
    });
    return data;
  },

  /**
   * Create a new repository
   */
  create: async (octokit, params) => {
    if (!params.name) {
      throw new Error('name parameter is required');
    }
    
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: params.name,
      description: params.description,
      homepage: params.homepage,
      private: params.private || false,
      has_issues: params.has_issues !== false,
      has_projects: params.has_projects !== false,
      has_wiki: params.has_wiki !== false,
      auto_init: params.auto_init || false,
      gitignore_template: params.gitignore_template,
      license_template: params.license_template
    });
    return data;
  },

  /**
   * Update repository settings
   */
  update: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const updateData = {};
    if (params.name) updateData.name = params.name;
    if (params.description !== undefined) updateData.description = params.description;
    if (params.homepage !== undefined) updateData.homepage = params.homepage;
    if (params.private !== undefined) updateData.private = params.private;
    if (params.has_issues !== undefined) updateData.has_issues = params.has_issues;
    if (params.has_projects !== undefined) updateData.has_projects = params.has_projects;
    if (params.has_wiki !== undefined) updateData.has_wiki = params.has_wiki;
    if (params.default_branch) updateData.default_branch = params.default_branch;
    
    const { data } = await octokit.repos.update({
      owner: params.owner,
      repo: params.repo,
      ...updateData
    });
    return data;
  },

  /**
   * Delete a repository
   */
  delete: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    await octokit.repos.delete({
      owner: params.owner,
      repo: params.repo
    });
    return { success: true, message: 'Repository deleted successfully' };
  },

  /**
   * List branches in a repository
   */
  listBranches: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.listBranches({
      owner: params.owner,
      repo: params.repo,
      protected: params.protected,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Get a specific branch
   */
  getBranch: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.branch) {
      throw new Error('owner, repo, and branch parameters are required');
    }
    
    const { data } = await octokit.repos.getBranch({
      owner: params.owner,
      repo: params.repo,
      branch: params.branch
    });
    return data;
  },

  /**
   * Create a new branch
   */
  createBranch: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.branch || !params.sha) {
      throw new Error('owner, repo, branch, and sha parameters are required');
    }
    
    const { data } = await octokit.git.createRef({
      owner: params.owner,
      repo: params.repo,
      ref: `refs/heads/${params.branch}`,
      sha: params.sha
    });
    return data;
  },

  /**
   * List tags in a repository
   */
  listTags: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.listTags({
      owner: params.owner,
      repo: params.repo,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * List collaborators for a repository
   */
  listCollaborators: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.listCollaborators({
      owner: params.owner,
      repo: params.repo,
      affiliation: params.affiliation || 'all',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  }
};
