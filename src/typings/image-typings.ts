// Prevents issues using the import syntax on the below image formats when using TypeScript
// Necessary when using TypeScript + Webpack to import the files.
declare module '*.jpg'
declare module '*.png'
