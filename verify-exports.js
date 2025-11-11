// Verification script to check if all exports are correct
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Component Exports...\n');

const checks = [
  {
    name: 'Button exports',
    file: 'src/components/ui/Button/index.ts',
    shouldContain: ['export { Button', 'export { GlowButton']
  },
  {
    name: 'Card exports',
    file: 'src/components/ui/Card/index.ts',
    shouldContain: ['export { Card', 'export { GlassCard']
  },
  {
    name: 'GlassCard component',
    file: 'src/components/ui/Card/GlassCard.tsx',
    shouldContain: ['export const GlassCard', 'GlassCard.displayName']
  },
  {
    name: 'GlowButton component',
    file: 'src/components/ui/Button/GlowButton.tsx',
    shouldContain: ['export const GlowButton', 'GlowButton.displayName']
  }
];

let allPassed = true;

checks.forEach(check => {
  try {
    const content = fs.readFileSync(check.file, 'utf8');
    const passed = check.shouldContain.every(str => content.includes(str));
    
    if (passed) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name} - Missing exports`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${check.name} - File not found: ${check.file}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('✅ All exports are correct!');
  console.log('\n📝 Next steps:');
  console.log('1. Stop the dev server (Ctrl+C)');
  console.log('2. Delete .next folder: rmdir /s /q .next');
  console.log('3. Restart: npm run dev');
  console.log('4. Hard refresh browser (Ctrl+Shift+R)');
} else {
  console.log('❌ Some exports are missing or incorrect');
  console.log('Please check the files listed above');
}

console.log('='.repeat(50) + '\n');
