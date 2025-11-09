# Private Package Setup Guide

This component library is configured as a **private npm package**. This guide explains how to use it in your projects.

## 🔒 Why Private?

Private packages offer:
- ✅ **Security** - Code not publicly accessible
- ✅ **Control** - Only authorized users can access
- ✅ **Flexibility** - Multiple distribution methods
- ✅ **Confidentiality** - Keep proprietary code private

## 📦 Current Configuration

The package is configured as:
- **Package Name**: `@share-component-lib/components`
- **Privacy**: Private (`"private": true`)
- **Access**: Restricted (`"access": "restricted"`)
- **Current Method**: Local file reference

## 🚀 Distribution Methods

### Method 1: Local File Reference (Current - Recommended for Development)

**In umijs-mono-repo:**

`package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "file:../share-component-lib"
  }
}
```

**Usage:**
```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install
```

**Pros:**
- ✅ No authentication needed
- ✅ Live development (changes reflect immediately)
- ✅ No publishing required
- ✅ Perfect for monorepo setup

**Cons:**
- ❌ Both repos must be on same machine
- ❌ Not suitable for CI/CD without repo access

---

### Method 2: GitHub Packages (Recommended for Production)

**Step 1: Configure share-component-lib**

Update `package.json`:
```json
{
  "name": "@YOUR_GITHUB_USERNAME/share-component-lib",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

Create `.npmrc`:
```
registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Step 2: Publish to GitHub Packages**

```bash
# Generate GitHub Personal Access Token with 'write:packages' scope
# https://github.com/settings/tokens

# Set token
export GITHUB_TOKEN=your_token_here

# Login
npm login --registry=https://npm.pkg.github.com

# Publish
cd /home/jiya/Projects/share-component-lib
npm publish
```

**Step 3: Configure umijs-mono-repo**

Create `.npmrc`:
```
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Update `package.json`:
```json
{
  "dependencies": {
    "@YOUR_GITHUB_USERNAME/share-component-lib": "^1.0.0"
  }
}
```

Install:
```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install
```

**Pros:**
- ✅ Integrated with GitHub
- ✅ Free for public repos
- ✅ Works in CI/CD
- ✅ Version control

**Cons:**
- ❌ Requires GitHub authentication
- ❌ Token management needed

---

### Method 3: Git Repository Direct Install

**In umijs-mono-repo:**

`package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "github:nitinreddy3/share-component-lib#main"
  }
}
```

Or install directly:
```bash
yarn add github:nitinreddy3/share-component-lib#v1.0.0
```

**Pros:**
- ✅ No npm registry needed
- ✅ Version via git tags
- ✅ Simple authentication (SSH/HTTPS)

**Cons:**
- ❌ Slower installation (clones entire repo)
- ❌ Requires git access
- ❌ No npm-specific features

---

### Method 4: Private npm Registry (Verdaccio)

For teams wanting their own private npm registry:

**Step 1: Setup Verdaccio**

```bash
# Install globally
npm install -g verdaccio

# Start server
verdaccio
# Runs at http://localhost:4873
```

**Step 2: Configure share-component-lib**

Create `.npmrc`:
```
registry=http://localhost:4873
```

**Step 3: Publish**

```bash
cd /home/jiya/Projects/share-component-lib

# Login (first time)
npm adduser --registry http://localhost:4873

# Publish
npm publish --registry http://localhost:4873
```

**Step 4: Install in umijs-mono-repo**

Create `.npmrc`:
```
registry=http://localhost:4873
```

```bash
yarn add @share-component-lib/components
```

**Pros:**
- ✅ Full control over registry
- ✅ No external dependencies
- ✅ Works offline
- ✅ npm-compatible

**Cons:**
- ❌ Requires server maintenance
- ❌ Need to host/deploy registry

---

## 🔐 Authentication Setup

### GitHub Packages Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `read:packages` (to install)
   - `write:packages` (to publish)
4. Generate and copy token
5. Set in `.npmrc` or environment:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

### For CI/CD (GitHub Actions)

Add token to repository secrets:

1. Go to repo Settings → Secrets → Actions
2. Add secret: `PACKAGES_TOKEN`
3. In workflow:

```yaml
- name: Install dependencies
  run: yarn install
  env:
    NODE_AUTH_TOKEN: ${{ secrets.PACKAGES_TOKEN }}
```

---

## 📋 Recommended Approach

### For Development (Current Setup)

✅ **Use local file reference** - Already configured!

```bash
cd /home/jiya/Projects/umijs-mono-repo
# Already has: "@share-component-lib/components": "file:../share-component-lib"
yarn install
```

### For Production/CI/CD

Option A: **GitHub Packages** (if using GitHub)
- Best for GitHub-based workflows
- Free for public repos

Option B: **Git Direct** (simplest for private repos)
- No registry needed
- Just git access

Option C: **Verdaccio** (for teams)
- Full npm experience
- Complete control

---

## 🔄 Switching Methods

### From Local to GitHub Packages

1. Publish to GitHub Packages:
   ```bash
   cd /home/jiya/Projects/share-component-lib
   # Configure as shown in Method 2
   npm publish
   ```

2. Update umijs-mono-repo:
   ```bash
   cd /home/jiya/Projects/umijs-mono-repo
   yarn remove @share-component-lib/components
   yarn add @YOUR_GITHUB_USERNAME/share-component-lib
   ```

### From Local to Git Direct

Update `package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "github:nitinreddy3/share-component-lib#v1.0.0"
  }
}
```

Run:
```bash
yarn install
```

---

## 🧪 Testing Private Package

### Test Local Build

```bash
cd /home/jiya/Projects/share-component-lib
yarn build

# Test in consuming project
cd /home/jiya/Projects/umijs-mono-repo
yarn start:clark
# Should work without errors
```

### Test Published Package

```bash
# Create test project
mkdir test-private-package
cd test-private-package
npm init -y

# Configure authentication (.npmrc)
# Install
yarn add @share-component-lib/components

# Test import
node -e "console.log(require('@share-component-lib/components'))"
```

---

## 📚 Current Status

**Active Method**: Local File Reference
**Location**: `file:../share-component-lib`
**Status**: ✅ Working
**Best For**: Development and monorepo setup

**To Deploy**: Consider switching to GitHub Packages or Git Direct for production deployments.

---

## 🆘 Troubleshooting

### "Package not found"

- Check authentication (tokens, `.npmrc`)
- Verify package name and registry
- Ensure you have access permissions

### "Unable to authenticate"

- Regenerate tokens
- Check `.npmrc` configuration
- Verify token scopes

### "Permission denied"

- Check organization access
- Verify token has correct permissions
- For GitHub: check repository visibility

---

**Package**: `@share-component-lib/components`  
**Privacy**: Private  
**Version**: 1.0.0  
**Current Distribution**: Local File Reference

