/**
 * Issues operations module
 * Handles all GitHub issue-related operations
 */

module.exports = {
  /**
   * List issues in a repository
   */
  list: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.issues.listForRepo({
      owner: params.owner,
      repo: params.repo,
      state: params.state || 'open',
      labels: params.labels,
      sort: params.sort || 'created',
      direction: params.direction || 'desc',
      since: params.since,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Get a specific issue
   */
  get: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number) {
      throw new Error('owner, repo, and issue_number parameters are required');
    }
    
    const { data } = await octokit.issues.get({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number
    });
    return data;
  },

  /**
   * Create a new issue
   */
  create: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.title) {
      throw new Error('owner, repo, and title parameters are required');
    }
    
    const { data } = await octokit.issues.create({
      owner: params.owner,
      repo: params.repo,
      title: params.title,
      body: params.body,
      assignees: params.assignees,
      milestone: params.milestone,
      labels: params.labels
    });
    return data;
  },

  /**
   * Update an existing issue
   */
  update: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number) {
      throw new Error('owner, repo, and issue_number parameters are required');
    }
    
    const updateData = {};
    if (params.title) updateData.title = params.title;
    if (params.body !== undefined) updateData.body = params.body;
    if (params.state) updateData.state = params.state;
    if (params.assignees) updateData.assignees = params.assignees;
    if (params.milestone !== undefined) updateData.milestone = params.milestone;
    if (params.labels) updateData.labels = params.labels;
    
    const { data } = await octokit.issues.update({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      ...updateData
    });
    return data;
  },

  /**
   * Close an issue
   */
  close: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number) {
      throw new Error('owner, repo, and issue_number parameters are required');
    }
    
    const { data } = await octokit.issues.update({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      state: 'closed'
    });
    return data;
  },

  /**
   * Add a comment to an issue
   */
  addComment: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number || !params.body) {
      throw new Error('owner, repo, issue_number, and body parameters are required');
    }
    
    const { data } = await octokit.issues.createComment({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      body: params.body
    });
    return data;
  },

  /**
   * List comments on an issue
   */
  listComments: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number) {
      throw new Error('owner, repo, and issue_number parameters are required');
    }
    
    const { data } = await octokit.issues.listComments({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      since: params.since,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Add labels to an issue
   */
  addLabels: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number || !params.labels) {
      throw new Error('owner, repo, issue_number, and labels parameters are required');
    }
    
    const { data } = await octokit.issues.addLabels({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      labels: Array.isArray(params.labels) ? params.labels : [params.labels]
    });
    return data;
  },

  /**
   * Remove a label from an issue
   */
  removeLabel: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.issue_number || !params.label) {
      throw new Error('owner, repo, issue_number, and label parameters are required');
    }
    
    await octokit.issues.removeLabel({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      name: params.label
    });
    return { success: true, message: 'Label removed successfully' };
  }
};
