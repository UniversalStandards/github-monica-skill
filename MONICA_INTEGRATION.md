# Monica AI Integration Guide

Complete guide for integrating GitHub Monica Skill with Monica AI.

## 🎯 Overview

This integration enables Monica AI to perform GitHub operations through natural language commands. Users can manage repositories, issues, pull requests, files, and more without leaving Monica AI.

## 📋 Prerequisites

1. **Deployed GitHub Monica Skill**
   - Deployed to Vercel, Heroku, or another hosting platform
   - Public URL accessible by Monica AI
   - Example: `https://github-monica-skill.vercel.app`

2. **GitHub Personal Access Token**
   - Created at [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Required scopes depend on operations you want to use:
     - `repo` - Full control of repositories
     - `gist` - Create and manage gists
     - `workflow` - Manage GitHub Actions
     - `user` - Read user profile data

3. **Monica AI Account**
   - With ability to add custom integrations

## 🔧 Setup Steps

### Step 1: Deploy the Service

Deploy to Vercel (recommended):

```bash
cd github-monica-skill
vercel --prod
```

Note your deployment URL: `https://your-app.vercel.app`

### Step 2: Prepare the OpenAPI Specification

Use the complete OpenAPI specification from `openapi.json` in this repository, or create a minimal one:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "GitHub Operations",
    "version": "1.0.0",
    "description": "GitHub integration for Monica AI"
  },
  "servers": [
    {
      "url": "https://your-app.vercel.app"
    }
  ],
  "paths": {
    "/execute": {
      "post": {
        "summary": "Execute a GitHub operation",
        "operationId": "executeGitHubOperation",
        "description": "Execute any of the 46+ available GitHub operations",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["operation"],
                "properties": {
                  "operation": {
                    "type": "string",
                    "description": "The operation to execute (e.g., listRepos, createIssue, getFile)"
                  },
                  "params": {
                    "type": "object",
                    "description": "Parameters for the operation"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Operation executed successfully"
          }
        }
      }
    },
    "/operations": {
      "get": {
        "summary": "List available operations",
        "operationId": "listGitHubOperations",
        "description": "Get a list of all 46+ available GitHub operations",
        "responses": {
          "200": {
            "description": "List of operations"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "description": "GitHub Personal Access Token"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ]
}
```

**Important**: Replace `https://your-app.vercel.app` with your actual deployment URL!

### Step 3: Add Integration to Monica AI

1. Open Monica AI
2. Navigate to Integrations or API settings
3. Select "Add Custom Integration" or "Add OpenAPI Service"
4. Paste the OpenAPI specification
5. Configure authentication:
   - Type: Bearer Token
   - Token: Your GitHub Personal Access Token

### Step 4: Test the Integration

Try these commands in Monica AI:

**Basic Operations:**
- "List my GitHub repositories"
- "Show me the README file from microsoft/vscode"
- "What are the open issues in my repository?"

**Repository Management:**
- "Create a new repository called 'test-repo' with description 'Test repository'"
- "Get details about my repository 'my-project'"
- "List branches in my repository"

**Issue Management:**
- "Create an issue in my-repo titled 'Bug fix' with description 'Fix login bug'"
- "List open issues in my-repo"
- "Close issue number 5 in my-repo"
- "Add comment 'Working on it' to issue 3 in my-repo"

**File Operations:**
- "Get the content of README.md from owner/repo"
- "Create a file called test.txt in my-repo with content 'Hello World'"
- "List files in the src directory of my-repo"

**Pull Requests:**
- "List open pull requests in my-repo"
- "Create a pull request from feature-branch to main in my-repo"
- "Get details of pull request 10 in my-repo"

**Search:**
- "Search GitHub for repositories about machine learning in Python"
- "Search for code containing 'function calculateTotal' in JavaScript"
- "Find open bug issues in facebook/react"

## 🎨 Operation Categories

### Repository Operations (10)
- `listRepos` - List user repositories
- `getRepo` - Get repository details
- `createRepo` - Create new repository
- `updateRepo` - Update repository settings
- `deleteRepo` - Delete repository
- `listBranches` - List branches
- `getBranch` - Get branch details
- `createBranch` - Create new branch
- `listTags` - List tags
- `listCollaborators` - List collaborators

### File Operations (5)
- `getFile` - Get file content
- `createFile` - Create new file
- `updateFile` - Update existing file
- `deleteFile` - Delete file
- `listFiles` - List directory contents

### Issue Operations (9)
- `listIssues` - List issues
- `getIssue` - Get issue details
- `createIssue` - Create issue
- `updateIssue` - Update issue
- `closeIssue` - Close issue
- `addComment` - Add comment
- `listComments` - List comments
- `addLabels` - Add labels
- `removeLabel` - Remove label

### Pull Request Operations (6)
- `listPRs` - List pull requests
- `getPR` - Get PR details
- `createPR` - Create pull request
- `updatePR` - Update pull request
- `mergePR` - Merge pull request
- `listPRFiles` - List PR files

### Commit Operations (3)
- `listCommits` - List commits
- `getCommit` - Get commit details
- `compareCommits` - Compare commits

### Workflow Operations (4)
- `listWorkflows` - List workflows
- `triggerWorkflow` - Trigger workflow
- `listWorkflowRuns` - List workflow runs
- `cancelWorkflowRun` - Cancel workflow run

### Gist Operations (5)
- `listGists` - List gists
- `getGist` - Get gist details
- `createGist` - Create gist
- `updateGist` - Update gist
- `deleteGist` - Delete gist

### Search Operations (4)
- `searchRepos` - Search repositories
- `searchCode` - Search code
- `searchIssues` - Search issues
- `searchUsers` - Search users

## 💡 Best Practices

### Token Security
- Never share your GitHub token publicly
- Use environment variables in production
- Rotate tokens regularly
- Use minimum required scopes

### Rate Limiting
- GitHub API: 5,000 requests/hour for authenticated users
- Monitor your usage
- Implement caching if needed
- Use pagination for large datasets

### Error Handling
- Monica AI will display error messages from the API
- Check error messages for troubleshooting
- Verify token has required permissions
- Ensure required parameters are provided

## 🔍 Troubleshooting

### Common Issues

**Issue**: "Unauthorized" or "No authorization token provided"
- **Solution**: Verify GitHub token is configured in Monica AI
- Check token hasn't expired
- Ensure token has required scopes

**Issue**: "Operation not found"
- **Solution**: Check operation name spelling
- Use `/operations` endpoint to see all available operations
- Ensure latest version is deployed

**Issue**: "owner and repo parameters are required"
- **Solution**: Provide all required parameters
- Check operation documentation
- Use natural language that includes necessary details

**Issue**: Rate limit exceeded
- **Solution**: Wait for rate limit to reset (usually 1 hour)
- Reduce number of requests
- Implement caching

### Verification Steps

1. **Test deployment directly:**
   ```bash
   curl https://your-app.vercel.app/operations
   ```

2. **Test with a simple operation:**
   ```bash
   curl -X POST https://your-app.vercel.app/execute \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"operation": "listRepos", "params": {"per_page": 5}}'
   ```

3. **Check Monica AI logs:**
   - Look for error messages
   - Verify requests are reaching your deployment
   - Check response format

## 🚀 Advanced Usage

### Custom Workflows

Create complex workflows by chaining operations:

1. "Search for repositories about machine learning"
2. "Get the README from the top result"
3. "Create an issue in my-repo with the information found"

### Automation

Use Monica AI scheduling (if available) to:
- Check for new issues daily
- Monitor pull request status
- Get repository activity summaries

### Integration with Other Tools

Combine with other Monica AI integrations:
- Slack notifications for new issues
- Email summaries of repository activity
- Calendar integration for release schedules

## 📊 Monitoring

Monitor your integration:
- Check deployment logs in Vercel
- Monitor API usage in GitHub settings
- Track error rates
- Set up alerts for failures

## 🆘 Support

If you encounter issues:
1. Check this documentation
2. Review [QUICKSTART.md](QUICKSTART.md) and [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)
3. Test the API directly using curl
4. Open an issue on GitHub
5. Check deployment logs

## 🎯 Next Steps

- Explore all 46 operations in [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)
- Learn about deployment options in [DEPLOYMENT.md](DEPLOYMENT.md)
- Customize the integration for your needs
- Share feedback and contribute improvements

---

Built with ❤️ for seamless GitHub automation through Monica AI
