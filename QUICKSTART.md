# Quick Start Guide

Get up and running with GitHub Monica Skill in 5 minutes!

## 🚀 Quick Setup (Local Testing)

### 1. Clone and Install

```bash
git clone https://github.com/UniversalStandards/github-monica-skill.git
cd github-monica-skill
npm install
```

### 2. Start the Server

```bash
npm start
```

You should see:
```
✓ GitHub Monica Skill server running on port 3000
✓ Health check: http://localhost:3000/
✓ Operations list: http://localhost:3000/operations
✓ Execute endpoint: POST http://localhost:3000/execute
```

### 3. Test It Works

Open a new terminal and run:

```bash
# Check health
curl http://localhost:3000/

# List available operations
curl http://localhost:3000/operations
```

### 4. Get Your GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Monica AI Integration"
4. Select scopes based on what you need:
   - `repo` - Full control of private repositories
   - `public_repo` - Access public repositories
   - `gist` - Create gists
   - `workflow` - Update GitHub Actions workflows
5. Click "Generate token"
6. **Copy and save your token** (you won't see it again!)

### 5. Try Your First Operation

List your repositories:

```bash
curl -X POST http://localhost:3000/execute \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"operation": "listRepos", "params": {"type": "all", "per_page": 5}}'
```

Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token!

## 🌐 Deploy to Vercel (Production)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
vercel
```

Follow the prompts and deploy!

### 3. Test Your Deployment

```bash
curl https://your-app-name.vercel.app/operations
```

## 🤖 Connect to Monica AI

### 1. Add to Monica AI

In Monica AI, add the OpenAPI specification from `openapi.json` or use this minimal version:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "GitHub Operations",
    "version": "1.0.0"
  },
  "servers": [{"url": "https://your-app.vercel.app"}],
  "paths": {
    "/execute": {
      "post": {
        "summary": "Execute GitHub operation",
        "operationId": "execute",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "operation": {"type": "string"},
                  "params": {"type": "object"}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "OK"}}
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {"type": "http", "scheme": "bearer"}
    }
  },
  "security": [{"bearerAuth": []}]
}
```

### 2. Configure Authentication

Add your GitHub token in Monica AI settings for the GitHub Operations integration.

### 3. Start Using!

Try these commands in Monica AI:
- "List my GitHub repositories"
- "Create an issue in my-repo titled 'Test issue'"
- "Show me open pull requests in my-repo"

## 📚 Common Operations

### Create a Repository

```bash
curl -X POST http://localhost:3000/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createRepo",
    "params": {
      "name": "my-new-repo",
      "description": "My awesome new repository",
      "private": false
    }
  }'
```

### Create an Issue

```bash
curl -X POST http://localhost:3000/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "createIssue",
    "params": {
      "owner": "your-username",
      "repo": "your-repo",
      "title": "Bug: Login not working",
      "body": "Users cannot log in when...",
      "labels": ["bug"]
    }
  }'
```

### Get File Content

```bash
curl -X POST http://localhost:3000/execute \
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

### Search Repositories

```bash
curl -X POST http://localhost:3000/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "searchRepos",
    "params": {
      "q": "language:javascript stars:>1000",
      "sort": "stars",
      "per_page": 10
    }
  }'
```

## 🔍 Troubleshooting

### "No authorization token provided"
- Make sure you include the `Authorization: Bearer YOUR_TOKEN` header
- Check that your token is valid and not expired

### "Operation not found"
- Check available operations: `curl http://localhost:3000/operations`
- Make sure operation name is spelled correctly (case-sensitive)

### "owner and repo parameters are required"
- Include required parameters in the `params` object
- Check the operation documentation in USAGE_EXAMPLES.md

### Rate Limiting
- GitHub API has rate limits (5,000 requests/hour for authenticated users)
- Check your rate limit: Use the GitHub API directly or implement caching

## 📖 Next Steps

- Read [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) for more examples
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options
- See [README.md](README.md) for complete documentation
- View [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 💬 Need Help?

- Open an issue on GitHub
- Check the documentation files
- Review the test.js file for examples

## 🎉 Success!

You now have a fully functional GitHub integration for Monica AI! Start automating your GitHub workflows with natural language commands.
