import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lessonsPath = path.join(__dirname, 'src/data/lessons.ts');

let c = fs.readFileSync(lessonsPath, 'utf8');
c = c.replace(/correctIndex:/g, 'correctAnswerIndex:');
fs.writeFileSync(lessonsPath, c);
console.log('Fixed correctIndex typo');
