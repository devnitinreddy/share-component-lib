# Distribution Guide

This guide explains different ways to distribute and consume the `@share-component-lib/components` package.

## Current Configuration

**Package**: `@share-component-lib/components`  
**Status**: Public npm package  
**Version**: 1.0.0

## Distribution Methods

### 1. npm Registry (Recommended) 

**Best for**: Production deployments

**Setup**: Package is configured as public

**Installation**:
```bash
npm install @share-component-lib/components
# or
yarn add @share-component-lib/components
```

**Pros**:
- ✅ Standard npm workflow
- ✅ Versioning and dependency management
- ✅ Fast installation
- ✅ Works in CI/CD
- ✅ Free (public packages)

**Cons**:
- ❌ Must publish first
- ❌ Requires npm authentication for publishing

---

### 2. Local File Reference (Current Development Setup)

**Best for**: Development in monorepo

**Setup**: Already configured in `umijs-mono-repo`

`package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "file:../share-component-lib"
  }
}
```

**Usage**:
```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install
```

**Pros**:
- ✅ No publishing needed
- ✅ Live changes (rebuild component lib, restart consuming app)
- ✅ No authentication
- ✅ Perfect for monorepo development

**Cons**:
- ❌ Both repos must be on same machine
- ❌ Not suitable for remote teams
- ❌ Manual syncing required

---

### 3. Git Direct Install

**Best for**: Testing unreleased versions

**Installation**:
```bash
# From main branch
yarn add github:nitinreddy3/share-component-lib

# From specific tag
yarn add github:nitinreddy3/share-component-lib#v1.0.0

# From specific branch
yarn add github:nitinreddy3/share-component-lib#develop
```

Or in `package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "github:nitinreddy3/share-component-lib#main"
  }
}
```

**Pros**:
- ✅ No npm registry needed
- ✅ Works with any git host
- ✅ Version via git tags
- ✅ Free

**Cons**:
- ❌ Slower installation (clones repo)
- ❌ Requires git access
- ❌ No npm-specific features (like semantic versioning)

---

### 4. GitHub Packages

**Best for**: Organizations using GitHub Enterprise

**Setup**:

Update `package.json`:
```json
{
  "name": "@YOUR_GITHUB_USERNAME/share-component-lib",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**Publishing**:
```bash
# Authenticate with GitHub
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

**Consuming**:

Create `.npmrc`:
```
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Install:
```bash
yarn add @YOUR_GITHUB_USERNAME/share-component-lib
```

**Pros**:
- ✅ Integrated with GitHub
- ✅ Free for public repos
- ✅ Private package support
- ✅ Works in GitHub Actions

**Cons**:
- ❌ Requires GitHub authentication
- ❌ Token management
- ❌ GitHub-specific

---

## Comparison Matrix

| Feature | npm Registry | Local File | Git Direct | GitHub Packages |
|---------|-------------|-----------|------------|----------------|
| **Speed** | ⚡⚡⚡ Fast | ⚡⚡⚡ Fast | ⚡ Slow | ⚡⚡ Medium |
| **Cost** | Free (public) | Free | Free | Free (public) |
| **CI/CD** | ✅ Excellent | ❌ Limited | ✅ Good | ✅ Excellent |
| **Versioning** | ✅ Semantic | ❌ Manual | ⚡ Git tags | ✅ Semantic |
| **Auth Required** | Publishing only | No | No | Yes |
| **Team Collab** | ✅ Excellent | ❌ Poor | ✅ Good | ✅ Excellent |
| **Dev Experience** | ✅ Excellent | ✅ Excellent | ⚡ Good | ✅ Excellent |

## Recommended Workflow

### For Development (Current)

✅ **Use local file reference**

```bash
# Already configured in umijs-mono-repo
cd /home/jiya/Projects/umijs-mono-repo
yarn install
yarn start:clark
```

### For Production

✅ **Publish to npm**

```bash
cd /home/jiya/Projects/share-component-lib
yarn build
npm publish --access public
```

Then update `umijs-mono-repo`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "^1.0.0"
  }
}
```

### For CI/CD

Set up automated publishing via GitHub Actions (see [PUBLISHING.md](./PUBLISHING.md))

---

## Switching Between Methods

### From Local to npm

1. **Publish the package**:
   ```bash
   cd /home/jiya/Projects/share-component-lib
   yarn build
   npm publish --access public
   ```

2. **Update umijs-mono-repo** `package.json`:
   ```json
   {
     "dependencies": {
       "@share-component-lib/components": "^1.0.0"
     }
   }
   ```

3. **Install**:
   ```bash
   cd /home/jiya/Projects/umijs-mono-repo
   yarn install
   ```

### From npm to Local

1. **Update umijs-mono-repo** `package.json`:
   ```json
   {
     "dependencies": {
       "@share-component-lib/components": "file:../share-component-lib"
     }
   }
   ```

2. **Reinstall**:
   ```bash
   yarn install
   ```

---

## Authentication

### npm (for publishing)

#### Web-based login (Recommended):
```bash
npm login
# Opens browser for authentication
```

#### Access Token (CI/CD):
1. Generate token at [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
2. Set token:
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
   ```

### GitHub Packages

1. Generate Personal Access Token at https://github.com/settings/tokens
2. Select scopes: `read:packages`, `write:packages`
3. Set token:
   ```bash
   export GITHUB_TOKEN=your_token_here
   npm login --registry=https://npm.pkg.github.com
   ```

---

## Current Status

**Active Method**: Local File Reference  
**Location**: `file:../share-component-lib`  
**Package Status**: Ready for npm publishing  
**Configuration**: Public package

**Next Steps**:
1. ✅ Package configured as public
2. ⏳ Publish to npm (when ready)
3. ⏳ Update consuming projects

---

## Quick Reference

**Install from npm**:
```bash
yarn add @share-component-lib/components
```

**Install locally (current)**:
```bash
# Already configured
yarn install
```

**Install from GitHub**:
```bash
yarn add github:nitinreddy3/share-component-lib
```

**Publish to npm**:
```bash
yarn build
npm publish --access public
```

---

For detailed publishing instructions, see [PUBLISHING.md](./PUBLISHING.md).  
For step-by-step npm publishing, see [NPM-PUBLISHING-GUIDE.md](./NPM-PUBLISHING-GUIDE.md).

