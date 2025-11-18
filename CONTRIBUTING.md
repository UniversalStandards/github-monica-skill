# Contributing to GitHub Monica Skill

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/github-monica-skill.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## 💻 Development

### Project Structure

- `api/` - Vercel serverless function
- `handlers/` - Operation registry
- `lib/` - Operation implementations
- `index.js` - Main request handler
- `server.js` - Express server for local testing

### Adding New Operations

1. **Add the implementation** to the appropriate `lib/*.js` file:
   ```javascript
   module.exports = {
     newOperation: async (octokit, params) => {
       // Validate required parameters
       if (!params.required_param) {
         throw new Error('required_param is required');
       }
       
       // Call GitHub API
       const { data } = await octokit.someApi.someMethod({
         param: params.required_param
       });
       
       return data;
     }
   };
   ```

2. **Register the operation** in `handlers/operations.js`:
   ```javascript
   const someModule = require('../lib/someModule');
   
   const operations = {
     // ... existing operations
     newOperation: someModule.newOperation
   };
   ```

3. **Test your operation** locally:
   ```bash
   npm start
   curl -X POST http://localhost:3000/execute \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"operation": "newOperation", "params": {"required_param": "value"}}'
   ```

4. **Update documentation** in README.md

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code patterns
- Include JSDoc comments for functions
- Validate all required parameters
- Return consistent error messages

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, etc.)

## ✨ Feature Requests

For feature requests:
- Describe the feature and use case
- Explain why it would be useful
- Consider backwards compatibility

## 📤 Pull Requests

1. Update documentation if needed
2. Follow the existing code style
3. Test your changes thoroughly
4. Write a clear PR description
5. Link any related issues

### PR Checklist

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No unrelated changes included

## 🔒 Security

If you discover a security vulnerability:
- **DO NOT** open a public issue
- Email the maintainers privately
- Include details and potential impact

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

## 💬 Questions?

Feel free to open an issue for questions or discussion.

Thank you for contributing! 🎉
