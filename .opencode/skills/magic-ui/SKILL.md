---
name: magic-ui
description: >
  Use when adding Magic UI animated components to Dhvani's React portfolio.
  Covers JavaScript conversion, component locations, and integration patterns.
---

# Magic UI Skill for Dhvani's Portfolio

## Critical Context
- **This project uses JavaScript (.jsx), NOT TypeScript**
- Magic UI components go in: `src/components/magicui/`
- shadcn/ui components stay in: `src/components/ui/`
- All Magic UI source code must be converted from TypeScript to JavaScript

## Installation Requirements
Already installed dependencies:
```bash
framer-motion
clsx
tailwind-merge
tailwindcss-animate
```

## Existing Magic UI Components
✅ Already installed in src/components/magicui/:
- magic-card.jsx
- particles.jsx
- typing-animation.jsx

## TypeScript to JavaScript Conversion Rules

### Remove Type Annotations
```typescript
// ❌ Magic UI source (TypeScript)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const MagicCard: React.FC<CardProps> = ({ children, className }) => {
  // ...
}
```

```javascript
// ✅ Converted for this project (JavaScript)
export const MagicCard = ({ children, className }) => {
  // ...
}
```

### Remove Type Imports
```typescript
// ❌ Remove these
import type { ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';
```

### Convert Interface Props to JSDoc (Optional)
```javascript
/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export const MagicCard = ({ children, className }) => {
  // ...
}
```

## File Naming Convention
- Component file: `kebab-case.jsx` (e.g., `icon-cloud.jsx`)
- Component name: `PascalCase` (e.g., `IconCloud`)

## Import Pattern
```javascript
// In any section component
import { IconCloud } from '../components/magicui/icon-cloud';
import { cn } from '../lib/utils';
```

## Integration Checklist
1. Copy source from https://magicui.design/docs/components/<slug>
2. Create file: src/components/magicui/<component>.jsx
3. Remove all TypeScript syntax
4. Change file extension references from .tsx to .jsx
5. Test component renders without errors
6. Import in target section
7. Apply dark theme classes if needed

## Recommended Components by Section

### Hero Section
- **blur-fade** - Smooth fade-in animation
- **text-animate** - Typing/word rotation effect
- **animated-beam** - Connecting lines between elements

### Skills Section
- **icon-cloud** - 3D rotating icon sphere
- **orbiting-circles** - Orbiting skill icons
- **marquee** - Infinite scrolling tech logos

### Projects Section  
- **border-beam** - Animated glowing borders (add to existing MagicCard)
- **blur-fade-in** - Staggered entrance animation

### Journey Section
- **timeline** - Vertical timeline component
- **bento-grid** - Modern card grid layout

### Services Section
- **border-beam** - Glowing card borders
- **shimmer-button** - Animated CTA buttons

### Background/Global
- **dot-pattern** - Background dots
- **animated-grid-pattern** - Animated grid background
- **particles** - Already installed ✓

## Common Integration Pattern
```javascript
// Example: Adding IconCloud to Skills.jsx

import { IconCloud } from '../components/magicui/icon-cloud';
import { skills } from '../data/skills';

export function Skills() {
  const iconSlugs = skills.map(skill => skill.iconSlug);
  
  return (
    <section className="relative py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>
        <IconCloud iconSlugs={iconSlugs} />
      </div>
    </section>
  );
}
```

## Animation Performance Tips
- Use `will-change: transform` sparingly
- Prefer `transform` and `opacity` for animations
- Test on mobile devices
- Use `requestAnimationFrame` for complex animations

## Dark Theme Integration
Most components need dark mode classes:
```javascript
<div className="bg-black text-white">
  <MagicComponent className="dark:border-white/20" />
</div>
```

## Troubleshooting

### "Component not rendering"
- Check console for TypeScript errors
- Verify all types are removed
- Check import paths (relative paths)

### "Animation not smooth"
- Verify framer-motion is installed
- Check for layout thrashing
- Use Chrome DevTools Performance tab

### "Styling conflicts"
- Check if shadcn/ui classes conflict
- Use cn() to merge classes properly
- Verify Tailwind config includes Magic UI colors



also use smooth cursor  , animated theme toggler , and icon cloud insdead of an solar system in my skills section.
also sue border beams for related cards in my project 
and the particles used for special  effects  make it look more visible its less visible now .
also use meteors special  effects in any other section to make look more intratvice.
