# Complete npm Publishing Guide

This guide walks you through publishing `@share-component-lib/components` as a **public npm package**.

## Prerequisites

### 1. npm Account

Create a free npm account at [npmjs.com](https://www.npmjs.com/signup).

### 2. Email Verification

Verify your email address. npm requires this before you can publish packages.

## Step-by-Step Publishing

### Step 1: Prepare Your Package

Ensure your package is ready:

```bash
cd /home/jiya/Projects/share-component-lib

# Install dependencies
yarn install

# Build the library
yarn build

# Verify build output exists
ls -la dist/
```

Expected output structure:
```
dist/
├── cjs/
│   ├── index.js
│   └── index.js.map
├── esm/
│   ├── index.js
│   └── index.js.map
└── types/
    ├── index.d.ts
    └── components/
        └── Banner/
            └── Banner.d.ts
```

### Step 2: Authenticate with npm

#### Option A: Web-Based Login (Recommended)

```bash
npm login
```

This will:
1. Open your browser automatically
2. Prompt you to log in to npm
3. Ask you to authorize the CLI
4. Return to the terminal once authenticated

Verify authentication:
```bash
npm whoami
# Should display: devnitinreddy
```

#### Option B: Access Token (For CI/CD)

1. Go to [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
2. Click "Generate New Token" → "Granular Access Token"
3. Configure:
   - **Token name**: `share-component-lib-publish`
   - **Expiration**: 90 days (or your preference)
   - **Packages and scopes**: Select specific package with **Read and Write**
   - Enable **2FA** if required
4. Copy the generated token

Then authenticate:
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

Or create `.npmrc` in your home directory:
```bash
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" >> ~/.npmrc
```

### Step 3: Dry Run

Test the publish process without actually publishing:

```bash
npm publish --dry-run --access public
```

This will show you:
- What files will be published
- Package size
- Any potential issues

Example output:
```
npm notice 📦  @share-component-lib/components@1.0.0
npm notice === Tarball Contents ===
npm notice 1.2kB  LICENSE
npm notice 4.0kB  README.md
npm notice 25.5kB dist/cjs/index.js
npm notice 1.0kB  dist/cjs/index.js.map
npm notice 24.8kB dist/esm/index.js
npm notice 1.0kB  dist/esm/index.js.map
npm notice 450B   dist/types/index.d.ts
npm notice === Tarball Details ===
npm notice name:          @share-component-lib/components
npm notice version:       1.0.0
npm notice package size:  15.2 kB
npm notice unpacked size: 58.0 kB
npm notice total files:   7
```

### Step 4: Publish

Publish your package to npm:

```bash
npm publish --access public
```

**Important**: The `--access public` flag is required for scoped packages (`@scope/package-name`) to be public.

Expected output:
```
npm notice 📦  @share-component-lib/components@1.0.0
npm notice === Tarball Contents ===
...
npm notice === Tarball Details ===
...
npm notice Publishing to https://registry.npmjs.org/
+ @share-component-lib/components@1.0.0
```

### Step 5: Verify Publication

1. **Via npm CLI**:
```bash
npm view @share-component-lib/components
```

2. **Via npmjs.com**:
Visit: `https://www.npmjs.com/package/@share-component-lib/components`

3. **Test Installation**:
```bash
# In a test project
npm install @share-component-lib/components
```

## Troubleshooting

### Error: "403 Forbidden"

**Cause**: You don't have permission to publish under the `@share-component-lib` scope.

**Solution**:
- Create your own scope: Change `@share-component-lib/components` to `@YOUR_USERNAME/components`
- Or create an npm organization: [Create organization](https://www.npmjs.com/org/create)

### Error: "402 Payment Required"

**Cause**: You're trying to publish a private scoped package without a paid account.

**Solution**:
- Ensure you're publishing as **public**: `npm publish --access public`
- Or upgrade to npm Pro/Teams for private packages

### Error: "You must verify your email"

**Cause**: Your npm account email is not verified.

**Solution**:
1. Check your email for verification link
2. Or resend: Go to [npmjs.com](https://www.npmjs.com/) → Account Settings → Email
3. Click "Resend verification email"

### Error: "Package name already exists"

**Cause**: Someone already published a package with this name.

**Solution**:
- Choose a different package name
- Or use your username as scope: `@YOUR_USERNAME/components`

### Error: "410 Gone" or "This route is no longer supported"

**Cause**: Using deprecated authentication method.

**Solution**:
- Use `npm login` (web-based) instead of `npm adduser`
- Or use granular access tokens

## Updating Your Package

When you make changes and want to publish a new version:

### 1. Update Version

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

This will:
- Update `package.json` version
- Create a git tag
- Commit the change

### 2. Build

```bash
yarn build
```

### 3. Publish

```bash
npm publish --access public
```

## Best Practices

### 1. Always Build Before Publishing

```bash
yarn build && npm publish --access public
```

### 2. Use npm Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "prepublishOnly": "yarn build",
    "publish:patch": "npm version patch && npm publish --access public",
    "publish:minor": "npm version minor && npm publish --access public",
    "publish:major": "npm version major && npm publish --access public"
  }
}
```

Then use:
```bash
yarn publish:patch
```

### 3. Use `.npmignore`

Already configured in your project to exclude:
- Source files (`src/`)
- Config files (`.prettierrc`, `tsconfig.json`)
- Development files (`node_modules/`, `.git/`)

### 4. Semantic Versioning

Follow [semver](https://semver.org/):
- **MAJOR**: Breaking changes (2.0.0)
- **MINOR**: New features, backward compatible (1.1.0)
- **PATCH**: Bug fixes (1.0.1)

## Using the Published Package

### In umijs-mono-repo

Update `package.json`:

```json
{
  "dependencies": {
    "@share-component-lib/components": "^1.0.0"
  }
}
```

Then:
```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install
```

### In Any React Project

```bash
npm install @share-component-lib/components

# Peer dependencies
npm install react react-dom @material-ui/core
```

## CI/CD Automation

See [PUBLISHING.md](./PUBLISHING.md) for GitHub Actions workflow setup.

## Support

- npm Documentation: [https://docs.npmjs.com/](https://docs.npmjs.com/)
- Publishing Packages: [https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- Scoped Packages: [https://docs.npmjs.com/cli/v10/using-npm/scope](https://docs.npmjs.com/cli/v10/using-npm/scope)

