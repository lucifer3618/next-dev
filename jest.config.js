const nextJest = require('next/jest')

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/$1',

    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Keep this if you have non-module CSS

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // transformIgnorePatterns is typically handled by next/jest, but keep yours if needed for specific node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!(.+\\.(js|jsx|ts|tsx)$)|react-markdown|vfile|unist|unified|bail|is-plain-obj|trough|remark|micromark|decode-named-character-reference|character-entities|property-information|hast|space-separated-tokens|comma-separated-tokens|mdast|escape-string-regexp|markdown-table|ccount|@radix-ui|framer-motion|lucide-react|@codesandbox|sonner)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js', // Exclude config file itself
    '!jest.setup.js', // Exclude setup file
    '!postcss.config.mjs', // Exclude config file
    '!next.config.mjs', // Exclude config file
    '!eslint.config.mjs', // Exclude config file
    '!commitlint.config.js', // Exclude config file
    '!app/layout.jsx', // Often contains minimal logic
    '!app/provider.jsx', // Often contains minimal logic
    '!app/ConvexClientProvider.jsx', // Often contains minimal logic
    '!convex/**', // Exclude convex generated files/setup
    '!__mocks__/**', // Exclude mocks
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
