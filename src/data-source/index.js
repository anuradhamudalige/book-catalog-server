import fs from 'fs';

export default function makeData() {
    return JSON.parse(fs.readFileSync(__dirname + '/dummy-books.json', 'utf8'));
}
