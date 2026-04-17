import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read original lessons.ts
// Oh wait, `patch_lessons.js` is what messed it up. I need to run `git checkout` via a child process or just fix the text myself.
import { execSync } from 'child_process';
execSync('git checkout src/data/lessons.ts');

const enCode = fs.readFileSync(path.join(__dirname, 'script_en.js'), 'utf-8');
const arCode = fs.readFileSync(path.join(__dirname, 'script_ar.js'), 'utf-8');

const enArrayContent = enCode.replace('export const newSectionsEn = [', '').replace(/\];$/, '');
const arArrayContent = arCode.replace('export const newSectionsAr = [', '').replace(/\];$/, '');

const lessonsPath = path.join(__dirname, 'src/data/lessons.ts');
let lessonsContent = fs.readFileSync(lessonsPath, 'utf-8');

// Replace the array endings precisely
// The english array is `export const courseDataEn: Section[] = [`
lessonsContent = lessonsContent.replace(
  /    \]\s*\n  }\n\];\s*export const courseDataAr/,
  `    ]\n  },` + enArrayContent + `];\n\nexport const courseDataAr`
);

// The arabic array is `export const courseDataAr: Section[] = [`
lessonsContent = lessonsContent.replace(
  /    \]\s*\n  }\n\];\s*export function getCourseData/,
  `    ]\n  },` + arArrayContent + `];\n\nexport function getCourseData`
);

fs.writeFileSync(lessonsPath, lessonsContent);
console.log('Successfully patched lessons.ts properly');
