import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src/components/previews');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Preview.tsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Add import if needed
  if (!content.includes('useLanguage') && (
        content.includes('Interactive Controls') || 
        content.includes('Item Count') ||
        content.includes('Font Size') ||
        content.includes('Text Color') ||
        content.includes('Select Button Type') ||
        content.includes('With Center Widget')
      )) {
    content = "import { useLanguage } from '@/src/i18n/LanguageContext';\n" + content;
    changed = true;
  }

  // Inject const { t } = useLanguage();
  if (content.includes('useLanguage') && !content.includes('const { t } = useLanguage()')) {
    content = content.replace(/export function (\w+Preview)\(\) \{/, 'export function $1() {\n  const { t } = useLanguage();\n');
    changed = true;
  }

  // Replace text
  if (content.includes('Interactive Controls')) {
    content = content.replace(/>Interactive Controls<\//g, '>{t(\'interactiveControls\')}</');
    changed = true;
  }
  
  if (content.includes('Item Count')) {
    content = content.replace(/>Item Count<\//g, '>{t(\'itemCount\')}</');
    changed = true;
  }
  
  if (content.includes('Font Size')) {
    content = content.replace(/>Font Size<\//g, '>{t(\'fontSize\')}</');
    changed = true;
  }

  if (content.includes('Text Color')) {
    content = content.replace(/>Text Color<\//g, '>{t(\'textColor\')}</');
    changed = true;
  }

  if (content.includes('With Center Widget')) {
    content = content.replace(/>With Center Widget<\//g, '>{t(\'withCenter\')}</');
    changed = true;
  }

  if (content.includes('Without Center Widget')) {
    content = content.replace(/>Without Center Widget<\//g, '>{t(\'withoutCenter\')}</');
    changed = true;
  }

  if (content.includes('Select Button Type')) {
    content = content.replace(/>Select Button Type<\//g, '>{t(\'selectButtonType\')}</');
    changed = true;
  }

  if (content.includes('Try Typing Below')) {
    content = content.replace(/>Try Typing Below<\//g, '>{t(\'tryTyping\')}</');
    changed = true;
  }

  if (content.includes('Simulate Keyboard Input')) {
    content = content.replace(/>Simulate Keyboard Input<\//g, '>{t(\'simulateKeyboard\')}</');
    changed = true;
  }

  if (content.includes('Normally you type directly on the phone keyboard.')) {
    content = content.replace(/Normally you type directly on the phone keyboard[^\<]+/, "{t('typingSimulNotice')}");
    changed = true;
  }

  if (content.includes('Notice that if you increase the item count')) {
    content = content.replace(/Notice that if you increase the item count[^\<]+/, "{t('listViewNotice')}");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
});
