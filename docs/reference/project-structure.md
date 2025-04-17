# Project Directory Structure

This document provides a comprehensive overview of the project's directory structure and the purpose of each directory and key file.

## Root Directory

```
next-dev/
├── .github/            # GitHub workflows and configuration
├── .husky/             # Git hooks for code quality
├── .next/              # Next.js build output (generated)
├── .swc/               # SWC compiler cache (generated)
├── .vercel/            # Vercel deployment configuration
├── app/                # Next.js application routes and pages
├── components/         # React components
├── configs/            # Configuration files
├── context/            # React context providers
├── convex/             # Convex database schema and functions
├── coverage/           # Test coverage reports (generated)
├── data/               # Static data and mock data
├── docs/               # Documentation
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── node_modules/       # Node.js dependencies (generated)
├── public/             # Static assets
├── styles/             # Global styles
├── synthetic-monitoring/ # Synthetic monitoring scripts
├── __mocks__/          # Jest mock files
├── __tests__/          # Test files
├── .env.local          # Local environment variables
├── .gitignore          # Git ignore configuration
├── CHANGELOG.md        # Project changelog
├── commitlint.config.js # Commit message linting configuration
├── components.json     # Component metadata
├── CONTRIBUTING.md     # Contribution guidelines
├── eslint.config.mjs   # ESLint configuration
├── jest.config.js      # Jest configuration
├── jest.setup.js       # Jest setup file
├── jsconfig.json       # JavaScript configuration
├── LIGHTHOUSE-IMPROVEMENTS.md # Lighthouse performance improvements
├── lighthouserc.json   # Lighthouse configuration
├── next.config.mjs     # Next.js configuration
├── package-lock.json   # npm package lock
├── package.json        # Project dependencies and scripts
├── postcss.config.mjs  # PostCSS configuration
└── README.md           # Project overview
```

## Key Directories

### `/app`

Contains the Next.js application routes and pages using the App Router pattern.

```
app/
├── (main)/             # Main application routes
├── api/                # API routes
├── ConvexClientProvider.jsx # Convex client provider
├── favicon.ico         # Site favicon
├── globals.css         # Global CSS
├── layout.jsx          # Root layout component
├── page.jsx            # Root page component
└── provider.jsx        # Global providers
```

### `/components`

Contains all React components organized by type.

```
components/
├── animations/         # Animation components
├── custom/             # Application-specific components
├── ui/                 # Reusable UI components
├── app-sidebar.jsx     # Application sidebar component
├── nav-main.jsx        # Main navigation component
├── nav-projects.jsx    # Projects navigation component
├── nav-user.jsx        # User navigation component
└── team-switcher.jsx   # Team switcher component
```

#### `/components/ui`

Contains reusable UI components that form the design system.

```
components/ui/
├── avatar.jsx          # Avatar component
├── button.jsx          # Button component
├── card.jsx            # Card component
├── dialog.jsx          # Dialog component
├── dropdown-menu.jsx   # Dropdown menu component
├── input.jsx           # Input component
├── label.jsx           # Label component
├── scroll-area.jsx     # Scroll area component
├── separator.jsx       # Separator component
├── tabs.jsx            # Tabs component
└── tooltip.jsx         # Tooltip component
```

#### `/components/custom`

Contains application-specific components that may use multiple UI components.

```
components/custom/
├── chat-interface.jsx  # Chat interface component
├── code-editor.jsx     # Code editor component
├── feature-card.jsx    # Feature card component
└── user-profile.jsx    # User profile component
```

### `/convex`

Contains Convex database schema and functions.

```
convex/
├── schema.js           # Database schema
├── users.js            # User-related database functions
├── projects.js         # Project-related database functions
└── messages.js         # Message-related database functions
```

### `/hooks`

Contains custom React hooks.

```
hooks/
├── use-auth.js         # Authentication hook
├── use-local-storage.js # Local storage hook
├── use-media-query.js  # Media query hook
└── use-theme.js        # Theme hook
```

### `/lib`

Contains utility functions and libraries.

```
lib/
├── api.js              # API utility functions
├── auth.js             # Authentication utilities
├── constants.js        # Application constants
├── utils.js            # General utility functions
└── validators.js       # Form validation functions
```

## Key Files

### Configuration Files

- `next.config.mjs`: Next.js configuration file
- `jsconfig.json`: JavaScript configuration file
- `postcss.config.mjs`: PostCSS configuration file
- `eslint.config.mjs`: ESLint configuration file
- `jest.config.js`: Jest configuration file
- `jest.setup.js`: Jest setup file
- `components.json`: Component metadata file
- `lighthouserc.json`: Lighthouse configuration file

### Package Management

- `package.json`: Defines project dependencies and scripts
- `package-lock.json`: Locks dependency versions

### Documentation

- `README.md`: Project overview and getting started guide
- `CONTRIBUTING.md`: Contribution guidelines
- `CHANGELOG.md`: Project changelog
- `LIGHTHOUSE-IMPROVEMENTS.md`: Lighthouse performance improvements

## File Naming Conventions

- React components: PascalCase for component names, kebab-case for filenames
  - Example: `button.jsx` exports a component named `Button`
- Utility functions: camelCase for both filenames and function names
  - Example: `utils.js` exports functions like `formatDate()`
- Constants: UPPER_SNAKE_CASE for constant names, camelCase for filenames
  - Example: `constants.js` exports constants like `MAX_FILE_SIZE`
- Hooks: camelCase for filenames, use prefix "use" for hook names
  - Example: `useAuth.js` exports a hook named `useAuth()`

## Related Documentation

- [File Naming Conventions](./file-naming-conventions.md)
- [Next.js Configuration](./nextjs-configuration.md)
- [Environment Variables Reference](./environment-variables.md)
