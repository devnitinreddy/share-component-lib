# Create GitHub Release v1.0.0

## ✅ Git Tag Created

The git tag `v1.0.0` has been successfully created and pushed to GitHub!

**Tag**: `v1.0.0`  
**Commit**: `1ac8ad5`  
**Status**: ✅ Pushed to GitHub

---

## 🚀 Create GitHub Release (Choose One Method)

### Method 1: GitHub Web Interface (Recommended - Easiest)

1. **Go to your repository**:
   - Visit: `https://github.com/devnitinreddy/share-component-lib`

2. **Navigate to Releases**:
   - Click on **"Releases"** in the right sidebar
   - Or go directly to: `https://github.com/devnitinreddy/share-component-lib/releases`

3. **Draft a new release**:
   - Click **"Draft a new release"** button

4. **Configure the release**:
   
   **Choose a tag**: Select `v1.0.0` (should appear in dropdown)
   
   **Release title**:
   ```
   Release v1.0.0 - Public Package
   ```
   
   **Description**:
   ```markdown
   # 🎉 First Public Release
   
   This is the first public release of `@devnitinreddy/share-component-lib` - a shared component library for multi-tenant UmiJS applications.
   
   ## ✨ Features
   
   - **Banner Component** - Customizable banner with theme support
   - **TypeScript Support** - Full type definitions included
   - **Material-UI v4** - Built on Material-UI components
   - **Theme Customization** - Per-tenant theme overrides
   - **Tree-shakeable** - ES Modules and CommonJS builds
   - **Type Definitions** - Full TypeScript declaration files
   
   ## 📦 Installation
   
   ```bash
   npm install @devnitinreddy/share-component-lib
   # or
   yarn add @devnitinreddy/share-component-lib
   ```
   
   ## 📚 Documentation
   
   - [README.md](https://github.com/devnitinreddy/share-component-lib#readme)
   - [Publishing Guide](./PUBLISHING.md)
   - [Distribution Guide](./DISTRIBUTION-GUIDE.md)
   
   ## 🔗 Package
   
   - **npm**: [@devnitinreddy/share-component-lib](https://www.npmjs.com/package/@devnitinreddy/share-component-lib)
   - **Version**: 1.0.0
   - **License**: ISC
   
   ## 📝 Components
   
   ### Banner
   
   ```tsx
   import { Banner } from '@devnitinreddy/share-component-lib'
   
   <Banner 
     title="Welcome" 
     subtitle="To our application"
     theme={{
       backgroundColor: '#1890ff',
       textColor: '#ffffff',
       accentColor: '#52c41a',
     }}
   />
   ```
   
   ## 🛠️ Tech Stack
   
   - React 17.0.2
   - TypeScript 5.9.3
   - Material-UI 4.12.4
   - Rollup 4.53.1
   
   ## 🎯 What's Changed
   
   - Converted from private to public npm package
   - Added comprehensive documentation
   - Set up automated publishing via GitHub Actions
   - Added multiple distribution methods
   
   **Full Changelog**: https://github.com/devnitinreddy/share-component-lib/commits/v1.0.0
   ```

5. **Publish the release**:
   - Check **"Set as the latest release"**
   - Click **"Publish release"** button

6. **Automatic Publishing**:
   - ⚠️ GitHub Actions workflow will trigger
   - ⚠️ But it requires `NPM_TOKEN` secret to publish to npm
   - See setup instructions below

---

### Method 2: GitHub CLI (Advanced)

If you want to use the command line, install GitHub CLI first:

```bash
# Install GitHub CLI (Ubuntu/Debian)
sudo apt install gh

# Or using snap
sudo snap install gh

# Authenticate
gh auth login
```

Then create the release:

```bash
cd /home/jiya/Projects/share-component-lib

gh release create v1.0.0 \
  --title "Release v1.0.0 - Public Package" \
  --notes "First public release of @devnitinreddy/share-component-lib.

Features:
- Banner component with Material-UI v4
- TypeScript support with full type definitions
- Theme customization support
- CommonJS and ES Modules builds
- Configured as public npm package

Installation:
\`\`\`bash
npm install @devnitinreddy/share-component-lib
\`\`\`

Documentation: https://github.com/devnitinreddy/share-component-lib#readme"
```

---

## ⚙️ Set Up Automated npm Publishing

For the GitHub Actions workflow to automatically publish to npm when you create a release, you need to set up an npm token:

### Step 1: Generate npm Token

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click on your profile → **Access Tokens**
3. Click **"Generate New Token"** → **"Granular Access Token"**
4. Configure:
   - **Token name**: `share-component-lib-github-actions`
   - **Expiration**: 90 days (or your preference)
   - **Packages and scopes**: Select your package with **Read and Write** permissions
   - If you have 2FA enabled, you'll need to complete it
5. Click **"Generate Token"**
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to your repository: `https://github.com/devnitinreddy/share-component-lib`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Configure:
   - **Name**: `NPM_TOKEN`
   - **Value**: Paste your npm token from Step 1
5. Click **"Add secret"**

### Step 3: Create the Release

Once you've added the `NPM_TOKEN` secret:
- Create the GitHub release (using Method 1 or 2 above)
- The GitHub Actions workflow will automatically trigger
- Your package will be built and published to npm

### Step 4: Verify

After the workflow runs:
1. Check the **Actions** tab on GitHub for workflow status
2. Verify on npm: `https://www.npmjs.com/package/@devnitinreddy/share-component-lib`
3. Test installation:
   ```bash
   npm view @devnitinreddy/share-component-lib
   ```

---

## 🔄 Alternative: Manual Publishing (Skip Automation)

If you prefer to publish manually instead of using GitHub Actions:

```bash
cd /home/jiya/Projects/share-component-lib

# Build
yarn build

# Login to npm (web-based)
npm login

# Publish
npm publish --access public

# Verify
npm view @devnitinreddy/share-component-lib
```

Then create the GitHub release afterward (it won't trigger the workflow if you've already published).

---

## 📋 Current Status

✅ **Commit**: Pushed to GitHub  
✅ **Tag**: `v1.0.0` created and pushed  
⏳ **Release**: Needs to be created (see methods above)  
⏳ **npm Token**: Needs to be added to GitHub secrets (for automation)  
⏳ **Publish**: Will happen automatically after release creation (if token is set up)

---

## 🎯 Recommended Flow

**Option A: Fully Automated** (Recommended)
1. Set up `NPM_TOKEN` in GitHub secrets (Steps above)
2. Create GitHub release (Method 1 - Web interface)
3. GitHub Actions automatically publishes to npm
4. Verify on npmjs.com

**Option B: Manual Publishing**
1. Publish manually to npm first (see commands above)
2. Create GitHub release for documentation
3. No automation needed

---

## 🆘 Troubleshooting

### GitHub Actions Fails

**Error**: `No secret found NPM_TOKEN`

**Solution**: Add `NPM_TOKEN` to GitHub repository secrets (see Step 2 above)

---

### npm Publish Fails

**Error**: `403 Forbidden`

**Solution**: 
- Ensure you have access to publish `@share-component-lib` scope
- Or change package name to `@YOUR_USERNAME/components`
- Or use unscoped name

---

### Can't Create Release

**Error**: Tag not found

**Solution**: Tag is already pushed (`v1.0.0`), just refresh the GitHub releases page

---

## 📖 Documentation

- [NPM-PUBLISHING-GUIDE.md](./NPM-PUBLISHING-GUIDE.md) - Detailed npm publishing guide
- [PUBLISHING.md](./PUBLISHING.md) - Publishing workflow
- [DISTRIBUTION-GUIDE.md](./DISTRIBUTION-GUIDE.md) - All distribution methods
- [PUBLIC-PACKAGE-CHANGES.md](./PUBLIC-PACKAGE-CHANGES.md) - Changes summary

---

**Ready to create your release!** 🚀

**Quick Link**: [Create Release on GitHub](https://github.com/devnitinreddy/share-component-lib/releases/new?tag=v1.0.0&title=Release+v1.0.0+-+Public+Package)

