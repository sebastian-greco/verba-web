const fs = require('fs');

function fixIcons(file) {
  let content = fs.readFileSync(file, 'utf8');
  // replace <span className="material-symbols-outlined...">  icon_name  </span> with { "icon_name" }
  content = content.replace(/<span\s+className="([^"]*material-symbols-outlined[^"]*)"\s*>([\s\S]*?)<\/span>/g, (match, classes, inner) => {
      const matchWord = inner.match(/^\s*([a-z_]+)\s*$/);
      if (matchWord) {
          return `<span className="${classes}">{"${matchWord[1]}"}</span>`;
      }
      return match;
  });
  fs.writeFileSync(file, content);
}

fixIcons('src/components/sections/PricingSection.tsx');
fixIcons('src/components/sections/PrivacySection.tsx');
fixIcons('src/components/sections/DemoSection.tsx');
fixIcons('src/components/sections/HeroSection.tsx');

console.log("Icons fixed");
