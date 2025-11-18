const repositories = require('../lib/repositories');
const files = require('../lib/files');
const issues = require('../lib/issues');
const pullRequests = require('../lib/pullRequests');
const commits = require('../lib/commits');
const workflows = require('../lib/workflows');
const gists = require('../lib/gists');
const search = require('../lib/search');

/**
 * Central operations registry
 * Maps operation names to their handler functions
 */
const operations = {
  // Repository operations
  listRepos: repositories.list,
  getRepo: repositories.get,
  createRepo: repositories.create,
  updateRepo: repositories.update,
  deleteRepo: repositories.delete,
  listBranches: repositories.listBranches,
  getBranch: repositories.getBranch,
  createBranch: repositories.createBranch,
  listTags: repositories.listTags,
  listCollaborators: repositories.listCollaborators,
  
  // File operations
  getFile: files.get,
  createFile: files.create,
  updateFile: files.update,
  deleteFile: files.delete,
  listFiles: files.list,
  
  // Issues operations
  listIssues: issues.list,
  getIssue: issues.get,
  createIssue: issues.create,
  updateIssue: issues.update,
  closeIssue: issues.close,
  addComment: issues.addComment,
  listComments: issues.listComments,
  addLabels: issues.addLabels,
  removeLabel: issues.removeLabel,
  
  // Pull Request operations
  listPRs: pullRequests.list,
  getPR: pullRequests.get,
  createPR: pullRequests.create,
  updatePR: pullRequests.update,
  mergePR: pullRequests.merge,
  listPRFiles: pullRequests.listFiles,
  
  // Commit operations
  listCommits: commits.list,
  getCommit: commits.get,
  compareCommits: commits.compare,
  
  // Workflow operations
  listWorkflows: workflows.list,
  triggerWorkflow: workflows.trigger,
  listWorkflowRuns: workflows.listRuns,
  cancelWorkflowRun: workflows.cancelRun,
  
  // Gist operations
  listGists: gists.list,
  getGist: gists.get,
  createGist: gists.create,
  updateGist: gists.update,
  deleteGist: gists.delete,
  
  // Search operations
  searchRepos: search.repositories,
  searchCode: search.code,
  searchIssues: search.issues,
  searchUsers: search.users
};

// Add descriptions to operations for documentation
Object.keys(operations).forEach(key => {
  if (!operations[key].description) {
    operations[key].description = `Execute ${key} operation`;
  }
});

module.exports = operations;
