/**
 * Pull Request operations module
 * Handles all GitHub pull request-related operations
 */

module.exports = {
  /**
   * List pull requests in a repository
   */
  list: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.pulls.list({
      owner: params.owner,
      repo: params.repo,
      state: params.state || 'open',
      head: params.head,
      base: params.base,
      sort: params.sort || 'created',
      direction: params.direction || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Create a new pull request
   */
  create: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.title || !params.head || !params.base) {
      throw new Error('owner, repo, title, head, and base parameters are required');
    }
    
    const { data } = await octokit.pulls.create({
      owner: params.owner,
      repo: params.repo,
      title: params.title,
      head: params.head,
      base: params.base,
      body: params.body,
      maintainer_can_modify: params.maintainer_can_modify,
      draft: params.draft
    });
    return data;
  },

  /**
   * Get a specific pull request
   */
  get: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.pull_number) {
      throw new Error('owner, repo, and pull_number parameters are required');
    }
    
    const { data } = await octokit.pulls.get({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pull_number
    });
    return data;
  },

  /**
   * Update a pull request
   */
  update: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.pull_number) {
      throw new Error('owner, repo, and pull_number parameters are required');
    }
    
    const updateData = {};
    if (params.title) updateData.title = params.title;
    if (params.body !== undefined) updateData.body = params.body;
    if (params.state) updateData.state = params.state;
    if (params.base) updateData.base = params.base;
    
    const { data } = await octokit.pulls.update({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pull_number,
      ...updateData
    });
    return data;
  },

  /**
   * Merge a pull request
   */
  merge: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.pull_number) {
      throw new Error('owner, repo, and pull_number parameters are required');
    }
    
    const { data } = await octokit.pulls.merge({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pull_number,
      commit_title: params.commit_title,
      commit_message: params.commit_message,
      merge_method: params.merge_method || 'merge'
    });
    return data;
  },

  /**
   * List files in a pull request
   */
  listFiles: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.pull_number) {
      throw new Error('owner, repo, and pull_number parameters are required');
    }
    
    const { data } = await octokit.pulls.listFiles({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pull_number,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  }
};
