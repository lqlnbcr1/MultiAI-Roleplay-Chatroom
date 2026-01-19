const fs = require('fs');
const files = [
    'README.md',
    'README_CN.md',
    '.gitignore',
    'next.config.js',
    'package.json',
    'postcss.config.js',
    'tailwind.config.ts',
    'tsconfig.json',
    'next-env.d.ts'
];
try {
    const result = files.map(f => ({ path: f, content: fs.readFileSync(f, 'utf8') }));
    console.log(JSON.stringify(result));
} catch (e) {
    console.error(e);
}
