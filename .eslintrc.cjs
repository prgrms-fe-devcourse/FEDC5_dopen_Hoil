module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',

    //홑따옴표
    quotes: ['error', 'single'],

    //delete `␍` 문제 해결해두었습니다. OS마다 줄바꿈 방식이 달라서 오류났던 문제입니다
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    //컬리룰 추가완료. 옵션 0: off, 1: warn, 2: error 입니다. prettier로 auto-formatting 됩니다
    curly: 2,
  },
};
