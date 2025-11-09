# Shared Component Library

> **📦 PUBLIC PACKAGE**: Available on npm as `@devnitinreddy/share-component-lib`

A reusable component library for multi-tenant UmiJS applications. Built with React 17, TypeScript, and Material-UI v4.

## Features

✨ **TypeScript Support** - Full type safety and IntelliSense  
🎨 **Material-UI Integration** - Built on Material-UI v4 components  
🎯 **Theme Customization** - Per-tenant theme override support  
📦 **Tree-shakeable** - ES Modules and CommonJS builds  
🔧 **Lightweight** - Peer dependencies model

## Installation

### From npm (Recommended)

```bash
# Using npm
npm install @devnitinreddy/share-component-lib

# Using yarn
yarn add @devnitinreddy/share-component-lib
```

### For Local Development

If you're working in a monorepo setup:

```bash
# In umijs-mono-repo - configured with local reference
# package.json has: "file:../share-component-lib"
yarn install
```

## Components

### Banner

A customizable banner component with theme support.

```tsx
import { Banner } from '@devnitinreddy/share-component-lib'

// Basic usage
<Banner title="Welcome" subtitle="To our application" />

// With custom theme
<Banner 
  title="Clark Tenant" 
  subtitle="Powered by UmiJS"
  theme={{
    backgroundColor: '#1890ff',
    textColor: '#ffffff',
    accentColor: '#52c41a',
    fontSize: '3rem',
    fontWeight: 'bold',
    padding: '3rem',
  }}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Banner title text |
| `subtitle` | `string` | No | Banner subtitle text |
| `theme` | `BannerTheme` | No | Theme customization object |
| `className` | `string` | No | Additional CSS class |

#### Theme Options

```typescript
interface BannerTheme {
  backgroundColor?: string      // Background color
  textColor?: string            // Text color
  accentColor?: string          // Accent underline color
  fontSize?: string | number    // Title font size
  fontWeight?: string | number  // Title font weight
  padding?: string | number     // Component padding
}
```

## Development

### Build the library

```bash
yarn build
```

### Watch mode (development)

```bash
yarn dev
```

### Clean build artifacts

```bash
yarn clean
```

## Tech Stack

- **React** v17.0.2
- **TypeScript** v5.9.3
- **Material-UI** v4.12.4
- **Rollup** v4.53.1

## Project Structure

```
share-component-lib/
├── src/
│   ├── components/
│   │   └── Banner/
│   │       ├── Banner.tsx      # Banner component
│   │       └── index.ts        # Exports
│   └── index.ts                # Main entry point
├── dist/                       # Build output (generated)
│   ├── cjs/                    # CommonJS build
│   ├── esm/                    # ES Modules build
│   └── types/                  # TypeScript declarations
├── rollup.config.cjs           # Rollup configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Package manifest
```

## Usage in Tenants

Each tenant can override the Banner theme:

```tsx
// tenants/clark/pages/index.tsx
import { Banner } from '@devnitinreddy/share-component-lib'

function ClarkHome() {
  return (
    <Banner 
      title="Clark Industries"
      subtitle="Innovation at its finest"
      theme={{
        backgroundColor: '#0066cc',
        accentColor: '#ffcc00',
      }}
    />
  )
}
```

```tsx
// tenants/bruce/pages/index.tsx
import { Banner } from '@devnitinreddy/share-component-lib'

function BruceHome() {
  return (
    <Banner 
      title="Bruce Enterprises"
      subtitle="Excellence delivered"
      theme={{
        backgroundColor: '#2c3e50',
        accentColor: '#e74c3c',
      }}
    />
  )
}
```

## Adding New Components

1. Create component folder in `src/components/`
2. Export from `src/components/YourComponent/index.ts`
3. Add to main `src/index.ts`
4. Build and test

## Publishing

See [PUBLISHING.md](./PUBLISHING.md) for detailed publishing instructions.

Quick publish:
```bash
yarn build
npm publish --access public
```

## License

ISC

