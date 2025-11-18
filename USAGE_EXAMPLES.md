# Usage Examples

This document provides practical examples of using the GitHub Monica Skill API.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Repository Operations](#repository-operations)
- [File Operations](#file-operations)
- [Issue Operations](#issue-operations)
- [Pull Request Operations](#pull-request-operations)
- [Search Operations](#search-operations)
- [Workflow Operations](#workflow-operations)
- [Gist Operations](#gist-operations)

## 🔐 Authentication

All requests require a GitHub Personal Access Token in the Authorization header:

```bash
Authorization: Bearer ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 📦 Repository Operations

### List Repositories

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listRepos",
    "params": {
      "type": "all",
      "sort": "updated",
      "direction": "desc",
      "per_page": 10
    }
  }'
```

### Get Repository Details

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "getRepo",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World"
    }
  }'
```

### Create Repository

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createRepo",
    "params": {
      "name": "my-new-repo",
      "description": "This is my new repository",
      "private": false,
      "auto_init": true
    }
  }'
```

### List Branches

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listBranches",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World"
    }
  }'
```

## 📄 File Operations

### Get File Content

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
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

### Create a New File

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createFile",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "path": "hello.txt",
      "message": "Add hello.txt",
      "content": "Hello, World!"
    }
  }'
```

### Update a File

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "updateFile",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "path": "hello.txt",
      "message": "Update hello.txt",
      "content": "Hello, Updated World!",
      "sha": "blob-sha-from-getFile"
    }
  }'
```

### List Files in Directory

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listFiles",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World",
      "path": "src"
    }
  }'
```

## 🐛 Issue Operations

### List Issues

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listIssues",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World",
      "state": "open",
      "labels": "bug",
      "sort": "created",
      "direction": "desc"
    }
  }'
```

### Create an Issue

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createIssue",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "title": "Found a bug",
      "body": "I found a bug in the login functionality. Steps to reproduce:\n1. Go to login page\n2. Enter credentials\n3. Click submit\n\nExpected: Login successful\nActual: Error message",
      "labels": ["bug", "high-priority"]
    }
  }'
```

### Add Comment to Issue

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "addComment",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World",
      "issue_number": 1,
      "body": "Thanks for reporting this issue! We will look into it."
    }
  }'
```

### Close an Issue

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "closeIssue",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "issue_number": 5
    }
  }'
```

## 🔀 Pull Request Operations

### List Pull Requests

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listPRs",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World",
      "state": "open",
      "sort": "created",
      "direction": "desc"
    }
  }'
```

### Create a Pull Request

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createPR",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "title": "Add new feature",
      "head": "feature-branch",
      "base": "main",
      "body": "This PR adds a new feature that improves user experience.\n\nChanges:\n- Added feature X\n- Updated documentation\n- Added tests"
    }
  }'
```

### Get Pull Request Details

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "getPR",
    "params": {
      "owner": "octocat",
      "repo": "Hello-World",
      "pull_number": 42
    }
  }'
```

### Merge a Pull Request

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "mergePR",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "pull_number": 42,
      "merge_method": "squash",
      "commit_title": "Add new feature (#42)"
    }
  }'
```

## 🔍 Search Operations

### Search Repositories

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "searchRepos",
    "params": {
      "q": "machine learning language:python stars:>1000",
      "sort": "stars",
      "order": "desc",
      "per_page": 10
    }
  }'
```

### Search Code

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "searchCode",
    "params": {
      "q": "addClass in:file language:js repo:jquery/jquery",
      "per_page": 5
    }
  }'
```

### Search Issues

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "searchIssues",
    "params": {
      "q": "is:issue is:open label:bug repo:facebook/react",
      "sort": "created",
      "order": "desc"
    }
  }'
```

### Search Users

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "searchUsers",
    "params": {
      "q": "location:seattle followers:>100",
      "sort": "followers",
      "order": "desc"
    }
  }'
```

## ⚙️ Workflow Operations

### List Workflows

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listWorkflows",
    "params": {
      "owner": "your-username",
      "repo": "your-repo"
    }
  }'
```

### Trigger Workflow

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "triggerWorkflow",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "workflow_id": "deploy.yml",
      "ref": "main",
      "inputs": {
        "environment": "production"
      }
    }
  }'
```

### List Workflow Runs

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listWorkflowRuns",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "workflow_id": "ci.yml",
      "status": "success"
    }
  }'
```

## 📝 Gist Operations

### List Gists

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "listGists",
    "params": {
      "per_page": 10
    }
  }'
```

### Create a Gist

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createGist",
    "params": {
      "description": "Example JavaScript snippet",
      "public": true,
      "files": {
        "hello.js": {
          "content": "console.log(\"Hello, World!\");"
        },
        "README.md": {
          "content": "# Example Gist\n\nThis is an example."
        }
      }
    }
  }'
```

### Get Gist

```bash
curl -X POST https://your-app.vercel.app/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "getGist",
    "params": {
      "gist_id": "abc123def456"
    }
  }'
```

## 🐍 Using with Python

```python
import requests
import json

GITHUB_TOKEN = "your_github_token"
API_URL = "https://your-app.vercel.app/execute"

def execute_operation(operation, params):
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    }
    
    data = {
        "operation": operation,
        "params": params
    }
    
    response = requests.post(API_URL, headers=headers, json=data)
    return response.json()

# Example: List repositories
result = execute_operation("listRepos", {"type": "all", "per_page": 5})
print(json.dumps(result, indent=2))

# Example: Create an issue
result = execute_operation("createIssue", {
    "owner": "your-username",
    "repo": "your-repo",
    "title": "Bug report",
    "body": "Description of the bug"
})
print(json.dumps(result, indent=2))
```

## 🟢 Using with Node.js

```javascript
const axios = require('axios');

const GITHUB_TOKEN = 'your_github_token';
const API_URL = 'https://your-app.vercel.app/execute';

async function executeOperation(operation, params) {
  try {
    const response = await axios.post(API_URL, {
      operation,
      params
    }, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

// Example: List repositories
executeOperation('listRepos', { type: 'all', per_page: 5 })
  .then(result => console.log(JSON.stringify(result, null, 2)));

// Example: Create an issue
executeOperation('createIssue', {
  owner: 'your-username',
  repo: 'your-repo',
  title: 'Bug report',
  body: 'Description of the bug'
}).then(result => console.log(JSON.stringify(result, null, 2)));
```

## 💡 Tips

- Always check the `success` field in the response
- Use pagination parameters (`page`, `per_page`) for large result sets
- GitHub API has rate limits - monitor your usage
- Store sensitive tokens securely
- Handle errors gracefully in your applications

## 📚 More Information

For a complete list of available operations, visit:
```
GET https://your-app.vercel.app/operations
```
