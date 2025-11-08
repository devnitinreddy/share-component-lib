# Publishing Guide

This guide explains how to publish the shared component library to npm.

## Prerequisites

1. **npm account**: Register at [npmjs.com](https://www.npmjs.com/)
2. **npm login**: Run `npm login` in your terminal
3. **Organization access** (optional): If using `@share-component-lib` scope, you need access to that organization

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

### Publish to npm

```bash
# Dry run (check what will be published)
npm publish --dry-run

# Publish to npm
npm publish
```

For scoped packages (like `@share-component-lib`), ensure `publishConfig.access` is set to `"public"` in `package.json`.

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

## Alternative: Private npm Registry

If you don't want to publish publicly:

### Option 1: GitHub Packages

Update `package.json`:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

### Option 2: Local Path

In `umijs-mono-repo/package.json`:

```json
{
  "dependencies": {
    "@share-component-lib/components": "file:../share-component-lib"
  }
}
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

