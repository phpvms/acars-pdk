import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['src/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      // '@stylistic/js': stylisticEslintPluginJs,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: 'tsconfig.json',
      },
    },

    rules: {
      indent: ['error', 2],
      'no-undef': 'warn',
    },
  },
]
