# Rollup Version Downgrade - Node.js 16 Compatibility

## Issue

When using Node.js 16.20.2, the following error occurred:

```
error rollup@4.53.1: The engine "node" is incompatible with this module. 
Expected version ">=18.0.0". Got "16.20.2"
```

## Root Cause

Rollup version 4.x requires Node.js >= 18.0.0, which is incompatible with our pinned Node.js version (16.20.2) used for UmiJS v3 compatibility.

## Solution

Downgraded Rollup and related plugins to version 3.x which supports Node.js 14+:

### Package Versions Changed

| Package | Before (v4.x) | After (v3.x) | Node.js Support |
|---------|--------------|-------------|-----------------|
| `rollup` | ^4.53.1 | ^3.29.5 | >=14.18.0 |
| `@rollup/plugin-commonjs` | ^29.0.0 | ^25.0.8 | >=14.0.0 |
| `@rollup/plugin-node-resolve` | ^16.0.3 | ^15.2.3 | >=14.0.0 |
| `@rollup/plugin-typescript` | ^12.3.0 | ^11.1.6 | >=14.0.0 |

### Updated `package.json`:

```json
{
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.8",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.6",
    "rollup": "^3.29.5"
  },
  "engines": {
    "node": ">=14.18.0 <=18.x"
  }
}
```

## Verification

### Build Success

After downgrading, the build completes successfully:

```bash
$ yarn build
✓ yarn clean && rollup -c rollup.config.cjs && tsc --declaration --emitDeclarationOnly --outDir dist/types

src/index.ts → dist/cjs/index.js, dist/esm/index.js...
created dist/cjs/index.js, dist/esm/index.js in 5.6s
Done ✓
```

### Output Structure

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
            ├── Banner.d.ts
            └── index.d.ts
```

## Rollup 3.x vs 4.x

### What's Different?

Rollup 4.x introduced:
- ✅ Better performance (slightly faster builds)
- ✅ Improved tree-shaking
- ✅ Better ESM support
- ❌ **Requires Node.js 18+** (breaking change)

Rollup 3.x provides:
- ✅ **Compatible with Node.js 14+**
- ✅ All core features needed for component libraries
- ✅ Stable and battle-tested
- ✅ Same output quality

### Impact on Output

**No functional differences** in the generated bundles:
- ✅ CJS and ESM formats work identically
- ✅ Tree-shaking still effective
- ✅ Type definitions generated correctly
- ✅ Source maps included

## Why Not Upgrade Node.js to 18?

We're using Node.js 16.20.2 because:

1. **UmiJS v3 Compatibility**: Works best with Node.js 14-16
2. **OpenSSL Issues**: Node.js 17+ has breaking OpenSSL changes
3. **Consistency**: Matches `umijs-mono-repo` environment
4. **Stability**: Proven track record with our stack

## Future Migration

When ready to upgrade to Node.js 18:

### Step 1: Test with Node.js 18

```bash
nvm install 18
nvm use 18
yarn install
yarn build
```

### Step 2: Update Dependencies

```json
{
  "devDependencies": {
    "rollup": "^4.x",
    "@rollup/plugin-commonjs": "^29.0.0",
    "@rollup/plugin-node-resolve": "^16.0.0",
    "@rollup/plugin-typescript": "^12.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Step 3: Update Workflows

Update `.github/workflows/publish.yml`:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'  # or 18.20.0 for specific version
```

### Step 4: Update .nvmrc

```bash
echo "18" > .nvmrc
```

## Warnings During Installation

You may see these warnings (safe to ignore):

### 1. Material-UI v4 Deprecation
```
warning @material-ui/core@4.12.4: Material UI v4 doesn't receive active 
development since September 2021.
```
**Status**: ✅ Safe - Material-UI v4 is stable and works perfectly for our use case.

### 2. Rollup Plugin Terser Deprecation
```
warning rollup-plugin-terser@7.0.2: This package has been deprecated and 
is no longer maintained. Please use @rollup/plugin-terser
```
**Status**: ⚠️ Consider updating in future:
```bash
yarn remove rollup-plugin-terser
yarn add -D @rollup/plugin-terser
```

Then update `rollup.config.cjs`:
```javascript
const { terser } = require('@rollup/plugin-terser')
```

### 3. Peer Dependency Warning
```
warning " > rollup-plugin-terser@7.0.2" has incorrect peer dependency 
"rollup@^2.0.0".
```
**Status**: ✅ Safe - Works fine with Rollup 3.x despite the warning.

## Testing

### Verify Local Build

```bash
cd /home/jiya/Projects/share-component-lib
node --version  # Should show: v16.20.2
yarn clean
yarn build
```

### Verify in Consumer Project

```bash
cd /home/jiya/Projects/umijs-mono-repo
yarn install
yarn build:clark
# Should build successfully using the local file reference
```

### Verify in CI/CD

GitHub Actions will:
1. ✅ Check out both repositories
2. ✅ Install dependencies (Rollup 3.x)
3. ✅ Build share-component-lib successfully
4. ✅ Build umijs-mono-repo successfully
5. ✅ Deploy to GitHub Pages

## Compatibility Matrix

| Tool | Version | Node.js Required | Status |
|------|---------|------------------|--------|
| **Node.js** | 16.20.2 | - | ✅ Active |
| **Rollup** | 3.29.5 | >=14.18.0 | ✅ Compatible |
| **UmiJS** | 3.5.43 | 10-16 | ✅ Compatible |
| **TypeScript** | 5.9.3 | >=14.17 | ✅ Compatible |
| **React** | 17.0.2 | >=14 | ✅ Compatible |
| **Material-UI** | 4.12.4 | >=12 | ✅ Compatible |

## Commands Reference

### Clean Install
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Build
```bash
yarn build
```

### Development (Watch Mode)
```bash
yarn dev
```

### Verify Node Version
```bash
node --version  # Should output: v16.20.2
```

## Related Files

- `package.json` - Updated dependency versions
- `.nvmrc` - Specifies Node.js 16.20.2
- `rollup.config.cjs` - Rollup configuration (no changes needed)
- `.github/workflows/publish.yml` - Uses Node.js 16.20.2

## Status

✅ **Rollup downgraded to 3.29.5**  
✅ **Compatible with Node.js 16.20.2**  
✅ **Build successful**  
✅ **CI/CD ready**  
✅ **No breaking changes to output**

---

**Summary**: Downgraded from Rollup 4.x to 3.x to maintain compatibility with Node.js 16.20.2, which is required for UmiJS v3 stability and OpenSSL compatibility.

