# GitHub Packages Setup - FREE Private Package Hosting

GitHub Packages is **FREE** for private repositories and provides npm-compatible package hosting.

## ✅ Why GitHub Packages?

- **FREE** for private packages
- Integrated with GitHub
- npm-compatible
- Works with CI/CD
- No additional account needed

## 🚀 Setup Guide

### Step 1: Update package.json

```bash
cd /home/jiya/Projects/share-component-lib
```

Update `package.json`:

```json
{
  "name": "@nitinreddy3/share-component-lib",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nitinreddy3/share-component-lib.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**Note**: Change `@nitinreddy3` to your GitHub username if different.

### Step 2: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. Configure:
   - **Note**: `share-component-lib-publish`
   - **Expiration**: 90 days (or custom)
   - **Scopes** (select these):
     - ✅ `repo` (Full control of private repositories)
     - ✅ `write:packages` (Upload packages)
     - ✅ `read:packages` (Download packages)
     - ✅ `delete:packages` (Delete packages - optional)
3. Click "Generate token"
4. **Copy the token** (you won't see it again!)

### Step 3: Authenticate with GitHub Packages

```bash
# Save token to environment (replace YOUR_TOKEN)
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com

# When prompted:
# Username: YOUR_GITHUB_USERNAME (e.g., nitinreddy3)
# Password: YOUR_GITHUB_TOKEN (paste the token)
# Email: YOUR_EMAIL
```

Or create `.npmrc` in share-component-lib:

```bash
cat > .npmrc << 'EOF'
@nitinreddy3:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF
```

**⚠️ Important**: `.npmrc` is already in `.gitignore` - never commit tokens!

### Step 4: Build and Publish

```bash
cd /home/jiya/Projects/share-component-lib

# Build the package
yarn build

# Verify what will be published
npm publish --dry-run

# Publish to GitHub Packages
npm publish
```

### Step 5: Install in umijs-mono-repo

**Create `.npmrc` in umijs-mono-repo:**

```bash
cd /home/jiya/Projects/umijs-mono-repo

cat > .npmrc << 'EOF'
@nitinreddy3:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF
```

**Update package.json:**

```json
{
  "dependencies": {
    "@nitinreddy3/share-component-lib": "^1.0.0"
  }
}
```

**Install:**

```bash
# Set your GitHub token
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Install
yarn install
```

## 🔄 For CI/CD (GitHub Actions)

### In share-component-lib

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to GitHub Packages

on:
  release:
    types: [published]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@nitinreddy3'
      
      - name: Install dependencies
        run: yarn install
      
      - name: Build
        run: yarn build
      
      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### In umijs-mono-repo

Update deployment workflows to use GitHub token:

```yaml
- name: Install dependencies
  run: yarn install
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🧪 Testing

### Verify Package Published

Visit: `https://github.com/nitinreddy3/share-component-lib/packages`

### Test Installation

```bash
# Create test directory
mkdir test-install
cd test-install
npm init -y

# Create .npmrc
cat > .npmrc << 'EOF'
@nitinreddy3:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF

# Set token
export GITHUB_TOKEN=your_token

# Install
npm install @nitinreddy3/share-component-lib

# Test import
node -e "console.log(require('@nitinreddy3/share-component-lib'))"
```

## 🔒 Security Best Practices

1. **Never commit tokens** - `.npmrc` is in `.gitignore`
2. **Use environment variables** - `${GITHUB_TOKEN}` in `.npmrc`
3. **Rotate tokens regularly** - GitHub tokens expire
4. **Use minimal scopes** - Only grant needed permissions
5. **Different tokens for different purposes**:
   - Read-only for installation
   - Write for publishing

## 📋 Quick Commands

```bash
# Login
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish

# Install in another project
export GITHUB_TOKEN=your_token
npm install @nitinreddy3/share-component-lib

# View package
https://github.com/nitinreddy3/share-component-lib/packages
```

## 🆘 Troubleshooting

### "Unable to authenticate"

```bash
# Check token validity
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user

# Should return your GitHub user info
```

### "Package not found"

- Verify package name matches GitHub username
- Check token has `read:packages` scope
- Ensure `.npmrc` is configured correctly

### "Permission denied"

- Token needs `write:packages` for publishing
- Token needs `read:packages` for installing
- Verify repository ownership

## 🎯 Current Recommendation

For **share-component-lib**, use one of these:

1. **Local File Reference** (Current - Best for Development)
   - Already working
   - No authentication needed
   - Perfect for monorepo

2. **GitHub Packages** (Best for Production/Sharing)
   - FREE
   - Private packages supported
   - Works with CI/CD

3. **Skip Publishing** (Simplest)
   - Keep using local file reference
   - Deploy umijs-mono-repo with bundled components
   - No separate package distribution needed

---

**Recommendation**: Stick with **local file reference** for now unless you need to:
- Share with other teams
- Deploy to multiple environments
- Version independently

Your current setup already works perfectly! 🎉

