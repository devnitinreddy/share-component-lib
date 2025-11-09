# npm Authentication Guide - 2025 Update

## ⚠️ npm Login Changes

As of November 2025, npm has changed authentication:

1. **Classic tokens are deprecated** (expire Nov 19)
2. **Old login route is no longer supported** (410 Gone error)
3. **Granular tokens required** with 2FA by default

## 🔐 New Authentication Methods

### Method 1: Web-Based Login (Easiest)

```bash
# This opens your browser for authentication
npm login

# Follow the prompts in your browser
# No password typing in terminal needed!
```

### Method 2: Granular Access Token

1. **Create Token**:
   - Visit: https://www.npmjs.com/settings/devnitinreddy/tokens
   - Click "Generate New Token"
   - Select "Granular Access Token"
   - Configure:
     - **Name**: `share-component-lib`
     - **Expiration**: 90 days (maximum)
     - **Packages**: Select your package or "All packages"
     - **Permissions**: 
       - Packages and scopes: Read and write
       - Organizations: (if applicable)

2. **Use Token**:

```bash
# Create/edit ~/.npmrc
echo "//registry.npmjs.org/:_authToken=npm_xxxxxxxxxx" >> ~/.npmrc

# Or set in project .npmrc (don't commit!)
echo "//registry.npmjs.org/:_authToken=npm_xxxxxxxxxx" > .npmrc
```

## 💰 Cost Warning: Private npm Packages

**Private packages on npm require a PAID account:**

| Plan | Cost | Features |
|------|------|----------|
| Free | $0 | Unlimited public packages only |
| **npm Pro** | **$7/month** | Unlimited private packages |
| npm Teams | $7/user/month | Team collaboration |
| npm Enterprise | Custom | Enterprise features |

**Your package is configured as private**, so you need npm Pro or higher to publish.

## ✅ FREE Alternatives

### Option 1: GitHub Packages (Recommended)

**FREE** for private repositories!

```bash
# See GITHUB-PACKAGES-SETUP.md for complete guide

# Quick setup:
# 1. Update package.json with GitHub registry
# 2. Create GitHub token at https://github.com/settings/tokens
# 3. Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com

# 4. Publish (FREE!)
npm publish
```

### Option 2: Local File Reference (Current Setup)

**Already working!** No publishing needed:

```json
// umijs-mono-repo/package.json
{
  "dependencies": {
    "@share-component-lib/components": "file:../share-component-lib"
  }
}
```

**Benefits:**
- ✅ FREE
- ✅ Works immediately
- ✅ No authentication needed
- ✅ Perfect for monorepo

### Option 3: Git Direct Install

**FREE** - Install directly from GitHub:

```bash
yarn add github:nitinreddy3/share-component-lib#v1.0.0
```

Or in package.json:
```json
{
  "dependencies": {
    "@share-component-lib/components": "github:nitinreddy3/share-component-lib#main"
  }
}
```

### Option 4: Self-Hosted Registry (Verdaccio)

**FREE** - Host your own npm registry:

```bash
# Install Verdaccio
npm install -g verdaccio

# Run
verdaccio
# Now running at http://localhost:4873

# Publish (FREE!)
npm publish --registry http://localhost:4873
```

## 🎯 Recommended Approach

For your **share-component-lib**:

### For Development (Now)
✅ **Keep using local file reference** - Already configured and working!

```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install  # Works perfectly!
```

### For Production/Sharing (If Needed)

Choose based on your needs:

| Method | Cost | Best For |
|--------|------|----------|
| **Local File** | FREE | Monorepo (current) |
| **GitHub Packages** | FREE | Private sharing with teams |
| **Git Direct** | FREE | Simple private distribution |
| npm Private | $7/mo | npm ecosystem integration |
| Verdaccio | FREE | Self-hosted, full control |

## 🚀 Quick Decision Guide

**Do you need to share this package outside this project?**

- **NO** → Keep current setup (local file reference)
- **YES, with team on GitHub** → Use GitHub Packages
- **YES, but simple** → Use Git direct install
- **YES, with npm tooling** → Pay for npm Pro
- **YES, with full control** → Self-host Verdaccio

## 📝 Summary

1. **npm login error** = Old authentication method deprecated
2. **Private packages on npm** = Requires paid account ($7/month)
3. **Your current setup** = Already working (local file reference)
4. **Best FREE alternative** = GitHub Packages

**Recommendation**: Don't publish to npm! Your current setup is perfect for this monorepo. If you need to share later, use GitHub Packages (free).

---

**Current Status**: ✅ Working with local file reference
**No action needed**: Deploy umijs-mono-repo as-is
**Optional**: Set up GitHub Packages if you need to share the package

