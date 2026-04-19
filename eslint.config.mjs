import queryPlugin from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import { configs as storybookConfigs } from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const stripPlugins = (config) => {
  const configWithoutPlugins = { ...config };
  delete configWithoutPlugins.plugins;
  return configWithoutPlugins;
};

const importRecommended = stripPlugins(importPlugin.flatConfigs.recommended);
const importTypescript = stripPlugins(importPlugin.flatConfigs.typescript);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  importRecommended,
  importTypescript,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@tanstack/query': queryPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-pascal-case': 'error',
      'import/no-anonymous-default-export': [2, { allowObject: true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off',
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      curly: ['error'],
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  prettier,
  ...storybookConfigs['flat/recommended'],
  globalIgnores(['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
