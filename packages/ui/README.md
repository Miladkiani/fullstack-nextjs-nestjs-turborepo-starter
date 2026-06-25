> Part of the **Production-Ready Monorepo Architecture**.  
> See the [root README](../../README.md) for workspace overview, setup, and architecture decisions.

# `@repo/ui`

A shared UI component library for the monorepo, built with React, TypeScript, and Tailwind CSS.  
It provides reusable primitives, feature-level components, utility hooks, and shared styling foundations for applications in the workspace.

---

## Overview

`@repo/ui` is designed to be:

- **Framework-friendly** for React-based apps
- **Tailwind-first** for styling consistency
- **Type-safe** with TypeScript
- **Composable** through raw primitives and custom implementations
- **Tree-shakable** through split exports for lightweight consumption

This package avoids heavy UI abstraction layers and instead focuses on maintainable, production-ready components that can evolve with product needs.

---

## Design Strategy

The library does **not** depend on Radix UI or other headless component systems as a core architectural foundation.

- raw React primitives
- custom component composition
- utility-first styling with Tailwind CSS
- focused abstractions only where they provide real value

This approach keeps the library:

- easier to control
- easier to debug
- less coupled to third-party APIs
- more adaptable to product-specific requirements

---

## Package Structure

The `@repo/ui` package centralizes component code under `packages/ui/src/components/`, while shared utility logic, hooks, and styles remain in dedicated directories.

This structure helps maintain a clear boundary between:

- visual building blocks
- reusable helper functions
- shared React hooks
- styling foundations

```txt
packages/
  ui/
src/
 components/
    form/
    drawer/
    skeletons/
    ImageCarouselModal/
    table/
 functions/
    cn.ts
    iconUtils.ts
 hooks/
    useDarkMode.ts
 styles.css
 index.ts
```

---

## Component Organization

### Thin components

Simple shared components are exported through the package entrypoint:

`import { Button, Input, Badge } from '@repo/ui';`

These are typically:

- small
- reusable
- dependency-light
- frequently used across apps

This layer can also include shared app-facing primitives such as icons and theme-related components like `ThemeProvider` and `ThemeToggle`.

### Complex components

Larger modules are separated into dedicated folders inside `src/components/` and imported from explicit paths when needed.

`import {Table} from '@repo/ui/components/table';`

`import {Drawer} from '@repo/ui/components/drawer';`

`import {Form} from '@repo/ui/components/form';`

This helps:

- reduce unnecessary bundle cost
- keep package boundaries clear
- improve tree-shaking
- avoid forcing all consumers to load every component path through a single barrel export

---

## Directory Philosophy

The structure inside `src/components/` is organized by complexity and ownership.

| Area                  | Purpose                                                       |
| --------------------- | ------------------------------------------------------------- |
| `ui/`                 | Small shared primitives and commonly reused components        |
| `form/`               | Form-related abstractions, inputs, and validation-oriented UI |
| `drawer/`             | Drawer-related components and composition                     |
| `skeletons/`          | Loading state components                                      |
| `ImageCarouselModal/` | Carousel-specific UI and interaction logic                    |
| `table/`              | Table-related UI, rendering, and helpers                      |

This layout makes the library easier to scale as new modules are introduced.

---

## Theming

The library supports dark mode through a small theming system built from hooks, shared components, and React context.

### Theme architecture

The theming layer includes:

- `useDarkMode` for managing theme state and persistence
- `ThemeProvider` for exposing theme state through React context
- `useTheme` for consuming theme state inside components
- `ThemeToggle` for switching between light and dark mode from the UI

### Characteristics

- uses `localStorage` to persist user preference
- uses `window.matchMedia('(prefers-color-scheme: dark)')` for system preference detection
- synchronizes theme changes across tabs using the `storage` event
- exposes theme state through context for app-wide usage
- integrates well with CSS variables and Tailwind-based theming

### Example behavior

- if the user has a saved theme, it is respected
- otherwise, the system theme is used
- when theme preference changes in one tab, other tabs update automatically
- any component using `useTheme` can access the current mode and toggle behavior

This provides a lightweight but practical theming strategy without requiring an external state library.

---

## Styling Approach

The package uses **Tailwind CSS** as the primary styling layer.

In addition:

- shared global styles can live in `styles/`
- CSS variables can be used for theme tokens
- dark mode can be driven by a combination of class-based strategy and custom hook logic
- component styles remain close to implementation and easy to refactor

This keeps styling:

- predictable
- reusable
- easy to override at the application layer

---

## Export Strategy

The package uses a **split export strategy**.

### Central exports

Lightweight components and common utilities are exported from the root entrypoint:

`import { Button, Card, Input } from '@repo/ui';`

### Path-based exports

Heavier or more specialized modules are imported from explicit paths:

`import {Drawer} from '@repo/ui/components/drawer';`

`import {Table} from '@repo/ui/components/table';`

`import { useDarkMode } from '@repo/ui/hooks/useDarkMode';`

### Why this matters

This strategy improves:

- tree-shaking
- consumer clarity
- bundle-size control
- long-term maintainability

It also prevents the root `index.ts` from becoming an oversized export surface for every module in the package.

---

## Build and Packaging

The package is configured for library distribution with a combination of:

- **TypeScript compiler (`tsc`)** for type-safe output
- **Tailwind CLI** for CSS generation
- package `exports` for controlled public entrypoints
- `sideEffects` configuration to preserve CSS imports correctly

### Dependencies

Core dependencies include:

- `clsx`
- `lucide-react`
- `tailwind-merge`

---

## Example Imports

### Root-level import

`import { Button, Input, Badge } from '@repo/ui';`

### Feature module import

`import {Drawer} from '@repo/ui/components/drawer';`

`import {Table} from '@repo/ui/components/table';`

### Hook import

`import { useDarkMode } from '@repo/ui/hooks/useDarkMode';`

---

## Functions, Hooks, and Shared Theme Abstractions

Shared non-visual logic is intentionally separated from components where appropriate.

### Functions

The `functions/` directory contains reusable helpers such as:

- `cn` for combining class names with `clsx` and `tailwind-merge`
- `isValidUrl` for checking whether a string is a valid HTTP/HTTPS URL
- `isValidIconName` for validating icon names against `lucide-react`

### Hooks

The `hooks/` directory contains reusable React hooks such as:

- `useDarkMode` for theme persistence and dark mode synchronization

### Shared theme abstractions

The package also includes theme-related abstractions under `packages/ui/src/components/`, such as:

- `ThemeProvider` for supplying theme state through context
- `useTheme` for safely accessing theme context
- `ThemeToggle` for toggling between light and dark mode in the UI

This separation improves maintainability by keeping rendering concerns and shared logic independent while still allowing higher-level composition where needed.

---

## Summary

`@repo/ui` is a pragmatic shared component package with:

- raw primitive-based architecture
- Tailwind-first styling
- isolated complex modules in `packages/ui/src/components/`
- custom theming support through `useDarkMode`, `ThemeProvider`, and `ThemeToggle`
- split exports for better bundle control
- production-friendly packaging for monorepo usage

It is optimized for teams that want a flexible internal UI system without overcommitting to heavyweight component frameworks.
