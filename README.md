# GitHub Monica Skill

A comprehensive GitHub integration for Monica AI that enables seamless GitHub operations through a simple API interface.

## 🚀 Features

- **30+ GitHub Operations** - Complete coverage of essential GitHub functionality
- **Repository Management** - Create, update, delete, and manage repositories
- **File Operations** - Read, create, update, and delete files in repositories
- **Issues & Pull Requests** - Full CRUD operations for issues and PRs
- **GitHub Actions** - Trigger and manage workflows
- **Gists** - Create and manage gists
- **Search** - Search across repositories, code, issues, and users
- **Production Ready** - Error handling, validation, and logging built-in
- **Easy Deployment** - Deploy to Vercel with one command

## 📋 Prerequisites

- Node.js 14.0.0 or higher
- GitHub Personal Access Token
- (Optional) Vercel account for deployment

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/UniversalStandards/github-monica-skill.git
   cd github-monica-skill
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run locally for testing**
   ```bash
   npm start
   # Or with hot reload
   npm run dev
   ```

4. **Visit** `http://localhost:3000` to see the health check

## 🚢 Deployment to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Get your deployment URL** (e.g., `https://github-monica-skill.vercel.app`)

4. **Test your deployment**
   ```bash
   curl https://your-app.vercel.app/operations
   ```

## 📖 Available Operations

### Repository Operations
- `listRepos` - List user repositories
- `getRepo` - Get repository details
- `createRepo` - Create a new repository
- `updateRepo` - Update repository settings
- `deleteRepo` - Delete a repository
- `listBranches` - List repository branches
- `getBranch` - Get branch details
- `createBranch` - Create a new branch
- `listTags` - List repository tags
- `listCollaborators` - List repository collaborators

### File Operations
- `getFile` - Get file content
- `createFile` - Create a new file
- `updateFile` - Update existing file
- `deleteFile` - Delete a file
- `listFiles` - List files in a directory

### Issue Operations
- `listIssues` - List repository issues
- `getIssue` - Get issue details
- `createIssue` - Create a new issue
- `updateIssue` - Update an issue
- `closeIssue` - Close an issue
- `addComment` - Add a comment to an issue
- `listComments` - List issue comments
- `addLabels` - Add labels to an issue
- `removeLabel` - Remove a label from an issue

### Pull Request Operations
- `listPRs` - List pull requests
- `getPR` - Get pull request details
- `createPR` - Create a pull request
- `updatePR` - Update a pull request
- `mergePR` - Merge a pull request
- `listPRFiles` - List files in a pull request

### Commit Operations
- `listCommits` - List repository commits
- `getCommit` - Get commit details
- `compareCommits` - Compare two commits

### Workflow Operations
- `listWorkflows` - List repository workflows
- `triggerWorkflow` - Trigger a workflow dispatch
- `listWorkflowRuns` - List workflow runs
- `cancelWorkflowRun` - Cancel a workflow run

### Gist Operations
- `listGists` - List user gists
- `getGist` - Get gist details
- `createGist` - Create a new gist
- `updateGist` - Update a gist
- `deleteGist` - Delete a gist

### Search Operations
- `searchRepos` - Search repositories
- `searchCode` - Search code
- `searchIssues` - Search issues and pull requests
- `searchUsers` - Search users

## 🔧 API Usage

### List Available Operations
```bash
GET /operations
```

### Execute an Operation
```bash
POST /execute
Headers:
  Authorization: Bearer YOUR_GITHUB_TOKEN
  Content-Type: application/json
Body:
{
  "operation": "listRepos",
  "params": {
    "type": "all",
    "sort": "updated"
  }
}
```

### Example: Create a New Issue
```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createIssue",
    "params": {
      "owner": "username",
      "repo": "repository",
      "title": "Bug Report",
      "body": "Found a bug in the application"
    }
  }'
```

### Example: Get File Content
```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "getFile",
    "params": {
      "owner": "microsoft",
      "repo": "vscode",
      "path": "README.md"
    }
  }'
```

## 🤖 Monica AI Integration

### OpenAPI Schema for Monica AI

Add this minimal OpenAPI schema to Monica AI to enable GitHub operations:

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
        "summary": "Execute GitHub operation",
        "operationId": "executeGitHubOperation",
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
                    "description": "Name of the GitHub operation to execute"
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
            "description": "Operation executed successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/operations": {
      "get": {
        "summary": "List available operations",
        "operationId": "listOperations",
        "responses": {
          "200": {
            "description": "List of available operations",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
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

### Using with Monica AI

Once configured in Monica AI, you can use natural language commands:

- "List my GitHub repositories"
- "Create an issue in my-repo titled 'Bug fix' with description 'Fix login bug'"
- "Get the content of README.md from microsoft/vscode"
- "Search GitHub for repositories about machine learning"
- "List pull requests in my repository"

## 🔒 Security

- **Never commit your GitHub token** to version control
- Use environment variables for sensitive data
- GitHub tokens should have appropriate scopes for your use case
- Consider using GitHub App authentication for production deployments
- All requests require authentication via Bearer token

## 🧪 Testing

Test the service locally:

```bash
# Start the server
npm start

# In another terminal, test an operation
curl -X POST http://localhost:3000/execute \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"operation": "listRepos", "params": {"type": "all"}}'
```

## 📁 Project Structure

```
github-monica-skill/
├── api/
│   └── index.js           # Vercel serverless function
├── handlers/
│   └── operations.js      # Operations registry
├── lib/
│   ├── repositories.js    # Repository operations
│   ├── files.js          # File operations
│   ├── issues.js         # Issue operations
│   ├── pullRequests.js   # Pull request operations
│   ├── commits.js        # Commit operations
│   ├── workflows.js      # Workflow operations
│   ├── gists.js          # Gist operations
│   └── search.js         # Search operations
├── index.js              # Main handler
├── server.js             # Express server
├── package.json          # Dependencies
├── vercel.json           # Vercel configuration
└── README.md             # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🆘 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Add GitHub App authentication support
- [ ] Add webhook handling
- [ ] Add rate limiting
- [ ] Add caching layer
- [ ] Add comprehensive test suite
- [ ] Add GraphQL API support
- [ ] Add support for GitHub Enterprise

---

Built with ❤️ for Monica AI integration