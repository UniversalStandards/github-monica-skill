/**
 * Commit operations module
 * Handles all GitHub commit-related operations
 */

module.exports = {
  /**
   * List commits in a repository
   */
  list: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.repos.listCommits({
      owner: params.owner,
      repo: params.repo,
      sha: params.sha,
      path: params.path,
      author: params.author,
      since: params.since,
      until: params.until,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Get a specific commit
   */
  get: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.ref) {
      throw new Error('owner, repo, and ref parameters are required');
    }
    
    const { data } = await octokit.repos.getCommit({
      owner: params.owner,
      repo: params.repo,
      ref: params.ref
    });
    return data;
  },

  /**
   * Compare two commits
   */
  compare: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.base || !params.head) {
      throw new Error('owner, repo, base, and head parameters are required');
    }
    
    const { data } = await octokit.repos.compareCommits({
      owner: params.owner,
      repo: params.repo,
      base: params.base,
      head: params.head
    });
    return data;
  }
};
