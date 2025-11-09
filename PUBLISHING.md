# Publishing Guide - Private Package

This guide explains how to publish the shared component library as a **private npm package**.

## Prerequisites

1. **npm account**: Register at [npmjs.com](https://www.npmjs.com/)
2. **npm login**: Run `npm login` in your terminal
3. **Organization access** (required): You need access to the `@share-component-lib` organization or use your own scoped package
4. **Paid npm account**: Private packages require a paid npm account (Pro, Teams, or Enterprise)

## Before Publishing

### 1. Update Version

Update the version in `package.json`:

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features, backward compatible)
npm version minor

# Major release (breaking changes)
npm version major
```

### 2. Build the Library

```bash
yarn build
```

Verify the build output in `dist/`:
- `dist/cjs/` - CommonJS format
- `dist/esm/` - ES Modules format
- `dist/types/` - TypeScript declarations

### 3. Test Locally

Test the library in umijs-mono-repo:

```bash
# In share-component-lib
yarn link

# In umijs-mono-repo
yarn link "@share-component-lib/components"

# Test both tenants
yarn start:clark
yarn start:bruce
```

## Publishing

### First Time Setup

If this is the first time publishing:

```bash
# Login to npm
npm login

# Verify you're logged in
npm whoami
```

### Publish to npm (Private)

```bash
# Dry run (check what will be published)
npm publish --dry-run

# Publish as private package
npm publish --access restricted
```

**Note**: This package is configured as **private** (`"private": true` and `"access": "restricted"`). This means:
- It will NOT be publicly visible on npmjs.com
- Only authenticated users with access can install it
- Requires a paid npm account

## Post-Publishing

### 1. Verify on npm

Check your package at: `https://www.npmjs.com/package/@share-component-lib/components`

### 2. Update umijs-mono-repo

In `umijs-mono-repo`, update to use the published package:

```bash
# Remove local link
yarn unlink "@share-component-lib/components"

# Install from npm
yarn add @share-component-lib/components@latest
```

### 3. Test the Published Package

```bash
yarn start:clark
yarn start:bruce
yarn build
```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (1.0.0 → 2.0.0): Breaking changes
- **MINOR** version (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** version (1.0.0 → 1.0.1): Bug fixes

### Example Workflow

```bash
# Make changes to components
# ...

# Update version
npm version patch  # or minor, or major

# Build
yarn build

# Publish
npm publish

# Push git tags
git push --tags
```

## Troubleshooting

### Package Name Already Exists

If `@share-component-lib/components` is taken:

1. Choose a different name in `package.json`
2. Update imports in `umijs-mono-repo`

### Permission Denied

- Verify you're logged in: `npm whoami`
- Check organization access (for scoped packages)
- Ensure `publishConfig.access: "public"` for scoped packages

### Build Errors

```bash
# Clean and rebuild
yarn clean
yarn build
```

## Alternative Distribution Methods

Since this is a private package, here are alternative ways to use it:

### Option 1: GitHub Packages (Recommended)

Publish to GitHub Packages instead of npm:

Update `package.json`:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@YOUR_GITHUB_USERNAME"
  }
}
```

Then publish:

```bash
# Authenticate with GitHub
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

Consuming project setup (in `umijs-mono-repo`):

Create `.npmrc`:
```
@share-component-lib:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:
```bash
yarn add @share-component-lib/components
```

### Option 2: Local File Reference (Current Setup)

In `umijs-mono-repo/package.json`:

```json
{
  "dependencies": {
    "@share-component-lib/components": "file:../share-component-lib"
  }
}
```

This is the current setup and works great for development and monorepo scenarios.

### Option 3: Git Repository

Install directly from Git:

```bash
# From GitHub
yarn add nitinreddy3/share-component-lib

# Or from a specific branch/tag
yarn add nitinreddy3/share-component-lib#v1.0.0
```

Update `package.json`:
```json
{
  "dependencies": {
    "@share-component-lib/components": "github:nitinreddy3/share-component-lib#main"
  }
}
```

### Option 4: Private npm Registry (Verdaccio)

For teams, you can host your own private npm registry:

1. Install Verdaccio:
```bash
npm install -g verdaccio
verdaccio
```

2. Configure `package.json`:
```json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

3. Publish:
```bash
npm publish --registry http://localhost:4873
```

## CI/CD Publishing

### GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: yarn install
      - run: yarn build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to repository secrets.

## Unpublishing

⚠️ **Warning**: Unpublishing is permanent and discouraged.

```bash
# Unpublish a specific version
npm unpublish @share-component-lib/components@1.0.0

# Deprecate instead (recommended)
npm deprecate @share-component-lib/components@1.0.0 "Use version 1.0.1 instead"
```

## Best Practices

1. ✅ **Always test locally before publishing**
2. ✅ **Follow semantic versioning**
3. ✅ **Write CHANGELOG.md for each release**
4. ✅ **Tag releases in git**
5. ✅ **Keep README.md updated**
6. ✅ **Test in consuming project (umijs-mono-repo)**

---

**Current Version**: 1.0.0  
**Status**: Ready for publishing  
**Package Name**: `@share-component-lib/components`

