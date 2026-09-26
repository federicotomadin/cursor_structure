import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const layerRestriction = (forbidden) => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: forbidden.map((pkg) => ({
        group: [pkg, `${pkg}/*`],
        message:
          'Violates the backend dependency rule (see .cursor/rules/backend-architecture.mdc).',
      })),
    },
  ],
});

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['backend/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['backend/**/*.js'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['backend/src/domain/**/*.ts'],
    rules: layerRestriction([
      '@app/application',
      '@app/infrastructure',
      '@app/presentation',
      '@nestjs/*',
    ]),
  },
  {
    files: ['backend/src/application/**/*.ts'],
    rules: layerRestriction(['@app/infrastructure', '@app/presentation', '@nestjs/*']),
  },
  {
    files: ['backend/src/infrastructure/**/*.ts'],
    rules: layerRestriction(['@app/presentation']),
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
);
