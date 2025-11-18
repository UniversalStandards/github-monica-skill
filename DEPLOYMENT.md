# Deployment Guide

This guide covers deploying the GitHub Monica Skill to various platforms.

## 🚀 Vercel (Recommended)

Vercel is the recommended platform for deploying this application.

### Prerequisites
- Vercel account (free tier available)
- Vercel CLI installed: `npm install -g vercel`

### Deployment Steps

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy the application**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? Press enter or provide a name
   - Directory? `.` (current directory)
   - Override settings? **N**

3. **Production deployment**
   ```bash
   vercel --prod
   ```

4. **Get your deployment URL**
   After deployment, you'll receive a URL like:
   ```
   https://github-monica-skill-xxx.vercel.app
   ```

5. **Test your deployment**
   ```bash
   curl https://your-deployment-url.vercel.app/operations
   ```

### Environment Variables

While not strictly necessary (tokens are passed via Authorization header), you can add environment variables in Vercel:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add variables as needed

## 🐳 Docker

Deploy using Docker containers.

### Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and run

```bash
# Build the image
docker build -t github-monica-skill .

# Run the container
docker run -p 3000:3000 github-monica-skill
```

## ☁️ AWS Lambda

Deploy as a serverless function on AWS Lambda.

### Using Serverless Framework

1. **Install Serverless**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless.yml**
   ```yaml
   service: github-monica-skill
   
   provider:
     name: aws
     runtime: nodejs18.x
     stage: prod
     region: us-east-1
   
   functions:
     api:
       handler: api/index.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
             cors: true
   ```

3. **Deploy**
   ```bash
   serverless deploy
   ```

## 🌐 Heroku

Deploy to Heroku platform.

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create a Heroku app**
   ```bash
   heroku create github-monica-skill
   ```

2. **Add a Procfile**
   ```
   web: npm start
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Open your app**
   ```bash
   heroku open
   ```

## 🔧 DigitalOcean App Platform

1. Go to DigitalOcean App Platform
2. Click "Create App"
3. Connect your GitHub repository
4. Select the branch
5. Configure:
   - Environment: Node.js
   - Build Command: `npm install`
   - Run Command: `npm start`
   - Port: 3000
6. Deploy

## 📱 Railway

1. Go to [Railway](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Railway will auto-detect settings
6. Deploy

## 🧪 Testing After Deployment

After deploying to any platform, test your deployment:

```bash
# Health check
curl https://your-deployment-url/

# List operations
curl https://your-deployment-url/operations

# Execute operation (requires GitHub token)
curl -X POST https://your-deployment-url/execute \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"operation": "listRepos", "params": {"type": "all"}}'
```

## 🔒 Security Considerations

- Never commit GitHub tokens to version control
- Use environment variables for sensitive data
- Enable HTTPS on your deployment
- Consider rate limiting for production
- Regularly update dependencies
- Monitor for security vulnerabilities

## 📊 Monitoring

Consider adding monitoring:
- Vercel Analytics (built-in for Vercel)
- New Relic
- DataDog
- Sentry for error tracking

## 🔄 CI/CD

Set up automatic deployments:

### GitHub Actions with Vercel

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 💡 Tips

- Use Vercel's preview deployments for testing
- Monitor API usage to stay within GitHub rate limits
- Consider implementing caching for frequently accessed data
- Use a CDN if serving static content
- Set up custom domains for production use

## 🆘 Troubleshooting

### Common Issues

**Issue**: Module not found errors
- **Solution**: Ensure all dependencies are in `dependencies`, not `devDependencies`

**Issue**: Port conflicts
- **Solution**: Check if PORT environment variable is set correctly

**Issue**: CORS errors
- **Solution**: Verify CORS is enabled in server.js

**Issue**: Rate limiting from GitHub
- **Solution**: Implement caching or use GitHub App authentication

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
