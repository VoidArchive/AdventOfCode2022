import { readFileSync } from 'fs';
const data = readFileSync('input.txt').toString().split('\n');
const testData = [
    '$ cd /',
    '$ ls',
    'dir dcvzbqf',
    '23804 gsdpmrq.bsz',
    '24936 nfngbl.mcn',
    '178747 plw.frm',
    'dir qdtw',
    'dir qmfvph',
    '$ cd dcvzbqf',
    '$ ls',
    'dir gfvl',
];
const root = {
    type: 'folder',
    name: '/',
    children: {},
    size: 0,
    parent: null,
};
function partOne(data) {
    let currentPath = root;
    for (let line = 0; line < data.length; line++) {
        const [size, command, args] = data[line].split(' ');
        if (command === 'cd') {
            if (args === '..') {
                if (currentPath.parent) {
                    currentPath = currentPath.parent;
                }
            }
            else if (args === '/') {
                currentPath = root;
            }
            else {
                currentPath = currentPath.children[args];
            }
        }
        if (size !== '$') {
            const [sizeOrDir, name] = data[line].split(' ');
            if (sizeOrDir === 'dir') {
                const folder = {
                    type: 'folder',
                    name,
                    children: {},
                    size: 0,
                    parent: currentPath,
                };
                currentPath.children[name] = folder;
            }
            else {
                const file = {
                    type: 'file',
                    name,
                    size: Number(sizeOrDir),
                };
                currentPath.children[name] = file;
            }
        }
    }
    const folderSize = [];
    const calculateSize = (folder) => {
        let size = 0;
        for (const child of Object.values(folder.children)) {
            if (child.type === 'file') {
                size += child.size;
            }
            else {
                size += calculateSize(child);
            }
        }
        folder.size = size;
        folderSize.push(size);
        return size;
    };
    calculateSize(root);
    return folderSize.filter((size) => size <= 100000).reduce((a, b) => a + b, 0);
}
function partTwo(data) {
    const filesystemSize = 70000000;
    const requiredForUpdate = 30000000;
    let currentPath = root;
    for (let line = 0; line < data.length; line++) {
        const [size, command, args] = data[line].split(' ');
        if (command === 'cd') {
            if (args === '..') {
                if (currentPath.parent) {
                    currentPath = currentPath.parent;
                }
            }
            else if (args === '/') {
                currentPath = root;
            }
            else {
                currentPath = currentPath.children[args];
            }
        }
        if (size !== '$') {
            const [sizeOrDir, name] = data[line].split(' ');
            if (sizeOrDir === 'dir') {
                const folder = {
                    type: 'folder',
                    name,
                    children: {},
                    size: 0,
                    parent: currentPath,
                };
                currentPath.children[name] = folder;
            }
            else {
                const file = {
                    type: 'file',
                    name,
                    size: Number(sizeOrDir),
                };
                currentPath.children[name] = file;
            }
        }
    }
    const folderSize = [];
    const calculateSize = (folder) => {
        let size = 0;
        for (const child of Object.values(folder.children)) {
            if (child.type === 'file') {
                size += child.size;
            }
            else {
                size += calculateSize(child);
            }
        }
        folder.size = size;
        folderSize.push(size);
        return size;
    };
    calculateSize(root);
    const spaceAvailable = filesystemSize - root.size;
    const spaceRequired = requiredForUpdate - spaceAvailable;
    console.log(root);
    return Math.min(...folderSize.filter((s) => s > spaceRequired));
}
// console.log(partOne(data));
console.log(partTwo(testData));
