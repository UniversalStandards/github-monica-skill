/**
 * Workflow operations module
 * Handles all GitHub Actions workflow-related operations
 */

module.exports = {
  /**
   * List workflows in a repository
   */
  list: async (octokit, params) => {
    if (!params.owner || !params.repo) {
      throw new Error('owner and repo parameters are required');
    }
    
    const { data } = await octokit.actions.listRepoWorkflows({
      owner: params.owner,
      repo: params.repo,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Trigger a workflow dispatch event
   */
  trigger: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.workflow_id) {
      throw new Error('owner, repo, and workflow_id parameters are required');
    }
    
    await octokit.actions.createWorkflowDispatch({
      owner: params.owner,
      repo: params.repo,
      workflow_id: params.workflow_id,
      ref: params.ref || 'main',
      inputs: params.inputs || {}
    });
    return { success: true, message: 'Workflow triggered successfully' };
  },

  /**
   * List workflow runs
   */
  listRuns: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.workflow_id) {
      throw new Error('owner, repo, and workflow_id parameters are required');
    }
    
    const { data } = await octokit.actions.listWorkflowRuns({
      owner: params.owner,
      repo: params.repo,
      workflow_id: params.workflow_id,
      status: params.status,
      per_page: params.per_page || 30,
      page: params.page || 1
    });
    return data;
  },

  /**
   * Cancel a workflow run
   */
  cancelRun: async (octokit, params) => {
    if (!params.owner || !params.repo || !params.run_id) {
      throw new Error('owner, repo, and run_id parameters are required');
    }
    
    await octokit.actions.cancelWorkflowRun({
      owner: params.owner,
      repo: params.repo,
      run_id: params.run_id
    });
    return { success: true, message: 'Workflow run cancelled' };
  }
};
