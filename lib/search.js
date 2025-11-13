/**
 * Search operations module
 * Handles all GitHub search-related operations
 */

module.exports = {
  /**
   * Search for repositories
   */
  repositories: async (octokit, params) => {
    if (!params.q) {
      throw new Error('q (query) parameter is required');
    }
    
    const { data } = await octokit.search.repos({
      q: params.q,
      sort: params.sort,
      order: params.order || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Search for code
   */
  code: async (octokit, params) => {
    if (!params.q) {
      throw new Error('q (query) parameter is required');
    }
    
    const { data } = await octokit.search.code({
      q: params.q,
      sort: params.sort,
      order: params.order || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Search for issues and pull requests
   */
  issues: async (octokit, params) => {
    if (!params.q) {
      throw new Error('q (query) parameter is required');
    }
    
    const { data } = await octokit.search.issuesAndPullRequests({
      q: params.q,
      sort: params.sort,
      order: params.order || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Search for users
   */
  users: async (octokit, params) => {
    if (!params.q) {
      throw new Error('q (query) parameter is required');
    }
    
    const { data } = await octokit.search.users({
      q: params.q,
      sort: params.sort,
      order: params.order || 'desc',
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  }
};
