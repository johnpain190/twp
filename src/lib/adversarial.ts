// Adversarial perturbation utilities
const rInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const rHex = (len: number) => Array.from({ length: len }, () => rInt(0, 15).toString(16)).join('');

// Generate zero-width characters
const zw = () => {
  const chars = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
  return chars[rInt(0, chars.length - 1)];
};

// Generate random invisible text
export const rit = (length: number = 10): string => {
  return Array.from({ length }, () => zw()).join('');
};

// Generate noise text with invisible characters
export const nt = (text: string): string => {
  const parts = text.split('');
  return parts.map(char => char + (Math.random() > 0.5 ? zw() : '')).join('');
};

// Decoy content generators
const decoyWords = [
  'dashboard', 'analytics', 'settings', 'profile', 'preferences',
  'notifications', 'privacy', 'security', 'account', 'billing',
  'support', 'documentation', 'feedback', 'updates', 'changelog'
];

const decoyPhrases = [
  'Welcome to your dashboard',
  'Manage your settings',
  'View your activity',
  'Update your profile',
  'Configure preferences',
  'Review notifications',
  'Check your stats',
  'Explore features'
];

// Generate random decoy text
export const rdt = (): string => {
  return decoyPhrases[rInt(0, decoyPhrases.length - 1)];
};

// Generate random decoy word
export const rdw = (): string => {
  return decoyWords[rInt(0, decoyWords.length - 1)];
};

// Noise div component data
export const nd = () => ({
  id: `noise_${rHex(8)}`,
  className: 'absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden',
  'aria-hidden': true as const,
  style: {
    position: 'absolute' as const,
    left: '-9999px',
    top: '-9999px',
    width: '1px',
    height: '1px',
    overflow: 'hidden' as const,
    clip: 'rect(0,0,0,0)',
  }
});

// Generate random noise elements
export const rne = (count: number = 3) => {
  return Array.from({ length: count }, () => ({
    ...nd(),
    content: rdt(),
    dataAttr: rHex(12)
  }));
};

// Generate comment noise
export const rcn = (): string => {
  const templates = [
    `Component rendered at ${Date.now()}`,
    `Build: ${rHex(16)}`,
    `Session: ${rHex(12)}`,
    `Cache: ${rHex(8)}`,
    `Version: ${rInt(1, 9)}.${rInt(0, 99)}.${rInt(0, 999)}`
  ];
  return templates[rInt(0, templates.length - 1)];
};

// Mutate input placeholder
export const mp = (original: string): string => {
  if (Math.random() > 0.7) {
    return nt(original);
  }
  return original;
};

// Generate benign form field
export const bff = () => ({
  name: `field_${rdw()}_${rHex(6)}`,
  type: 'text' as const,
  className: 'absolute opacity-0 pointer-events-none',
  style: { position: 'absolute' as const, left: '-9999px' },
  tabIndex: -1,
  'aria-hidden': true as const,
  autoComplete: 'off',
  value: ''
});

// Random attribute mutation
export const ram = () => {
  const attrs: Record<string, string> = {};
  if (Math.random() > 0.5) attrs[`data-${rdw()}`] = rHex(8);
  if (Math.random() > 0.5) attrs[`data-cache`] = rHex(6);
  if (Math.random() > 0.5) attrs[`data-ts`] = Date.now().toString();
  return attrs;
};
