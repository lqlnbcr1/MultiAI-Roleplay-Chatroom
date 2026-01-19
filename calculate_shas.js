const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { execSync } = require('child_process');

function getGitBlobSha(filePath) {
    try {
        const content = fs.readFileSync(filePath);
        const header = `blob ${content.length}\0`;
        const store = Buffer.concat([Buffer.from(header), content]);
        return crypto.createHash('sha1').update(store).digest('hex');
    } catch (e) {
        return null;
    }
}

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (['node_modules', '.next', '.git', '.npm-cache', 'coverage'].includes(file)) continue;
            findFiles(filePath, fileList);
        } else {
            if (file === '.DS_Store' || file.endsWith('.pem') || file.includes('read_files_for_mcp.js')) continue;
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = findFiles('.');
const result = [];

for (const file of allFiles) {
    const sha = getGitBlobSha(file);
    // Normalize path to match github (forward slashes, no leading ./)
    const normalizedPath = file.replace(/\\/g, '/').replace(/^\.\//, '');
    if (sha) {
        result.push({ path: normalizedPath, sha });
    }
}

console.log(JSON.stringify(result));
