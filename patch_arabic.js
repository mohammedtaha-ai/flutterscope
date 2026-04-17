import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const arCode = fs.readFileSync(path.join(__dirname, 'script_ar.js'), 'utf-8');
const arArrayContent = arCode.replace('export const newSectionsAr = [', '').replace(/\];$/, '');

const lessonsPath = path.join(__dirname, 'src/data/lessons.ts');
let lessonsContent = fs.readFileSync(lessonsPath, 'utf-8');

lessonsContent = lessonsContent.replace(
  /    \]\s*\n  }\n\];\s*export function getCourseData/,
  `    ]\n  },` + arArrayContent + `];\n\nexport function getCourseData`
);

fs.writeFileSync(lessonsPath, lessonsContent);
console.log('Successfully injected Arabic sections');
