import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  // Vendored/generated — never hand-edited, not ours to lint.
  { ignores: ['dist', '.next', 'public/**'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, React: 'readonly' },
      parser: typescriptParser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescript,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // TypeScript's own compiler (noUnusedLocals/noUnusedParameters, see
      // tsconfig.json) already covers unused-variable and undefined-symbol
      // checks with full type information — these base-JS rules only
      // false-positive on TS-only constructs (types, R3F JSX intrinsics).
      'no-undef': 'off',
      'no-unused-vars': 'off',
      // Types (via TS props interfaces) already cover this; the plugin
      // doesn't understand TS prop typing.
      'react/prop-types': 'off',
      // react-three-fiber's JSX intrinsics (mesh/group/primitive props like
      // position/args/attach) aren't DOM attributes — this rule only knows
      // about actual HTML/SVG elements.
      'react/no-unknown-property': 'off',
      // Plain apostrophes in prose copy are fine — not worth an HTML entity.
      'react/no-unescaped-entities': 'off',
    },
  },
]
