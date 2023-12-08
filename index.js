const fs = require('fs');
const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
const separateFiles = (dir, reference, mod = { inclusive: false, measurement : 'KiB'}) => {
    if(!fs.existsSync(dir)) {
        throw new Error('Directory does not exist');
    }
    const rFiles = [];

    const dirFiles = fs.readdirSync(dir);

    const unitIndex = sizes.indexOf(mod.measurement||'KiB');

    for (const file of dirFiles) {

        const stat = fs.statSync(`${dir}/${file}`);

        const size = formatBytes(stat.size, unitIndex);

        const state = mod.inclusive ? size >= reference : size > reference

        if (stat.isFile()) {
            if (state) {
                rFiles.push(file);
            }
        }
    }
    return rFiles;
}
function formatBytes(bytes, unitIndex) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    
    return bytes/(Math.pow(k, unitIndex))
}

module.exports = separateFiles;