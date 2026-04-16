# Dhvani Bhesaniya Portfolio — Agent Rules

## Project Overview

Personal developer portfolio showcasing Rust, backend engineering, and full-stack projects.
Built with React + Vite, styled with Tailwind CSS v4, enhanced with Magic UI animated components.

## Build & Development Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run build            # Production build
npm run preview          # Preview production build

# Deployment
npm run predeploy        # Runs build before deploy
npm run deploy           # Deploy to GitHub Pages

# No lint/test commands configured - verify changes manually by running dev/build
```

## Tech Stack

- React 18 (JavaScript/JSX - **NOT TypeScript**)
- Vite (build tool)
- Tailwind CSS v4 (utility-first styling)
- Magic UI (animated components - copy/paste only, **NOT npm**)
- shadcn/ui (form components in `src/components/ui/`)
- Framer Motion (animation library)
- Lenis (smooth scrolling)

## File Structure

```
src/
├── components/
│   ├── magicui/     ← Magic UI components (border-beam, blur-fade, etc.)
│   ├── ui/          ← shadcn/ui (badge, button, card, input, textarea)
│   ├── Hero.jsx     ← Introduction section
│   ├── About.jsx    ← Personal bio
│   ├── Journey.jsx  ← Career timeline
│   ├── Skills.jsx   ← Technical skills
│   ├── Projects.jsx ← Project grid
│   ├── ProjectCard.jsx ← Individual project card
│   ├── Services.jsx ← Services offered
│   ├── Contact.jsx  ← Contact form
│   ├── Footer.jsx    ← Footer links
│   ├── Navbar.jsx    ← Navigation
│   └── LoadingScreen.jsx ← Initial loading animation
├── data/
│   ├── certifications.js
│   ├── projects.js
│   ├── services.js
│   └── skills.js
├── hooks/
│   └── useLenis.js   ← Lenis smooth scroll hook
├── lib/
│   └── utils.js     ← cn() helper
├── App.jsx
├── index.css
└── main.jsx

public/
├── assets/img/portfolio/  ← Project screenshots
├── assets/certificates/  ← PDF certificates
├── assets/resume/        ← Resume PDFs
└── images/               ← Profile images
```

## Code Style Guidelines

### JavaScript Rules (No TypeScript)
- All component files use `.jsx` extension
- Remove TypeScript types from copied Magic UI components
- No `.tsx`, `interface`, `type`, or generic syntax

### Naming Conventions
- **Components**: PascalCase (`HeroSection.jsx`)
- **Hooks**: camelCase with `use` prefix (`useLenis.js`)
- **Data files**: camelCase (`projects.js`)
- **CSS classes**: kebab-case in Tailwind

### Import Patterns

```javascript
// Magic UI components
import { BorderBeam } from '@/components/magicui/border-beam'

// shadcn/ui components
import { Button } from '@/components/ui/button'

// Data files
import { projects } from '@/data/projects'

// Hooks
import { useScrollTo } from '@/hooks/useLenis'

// Utils
import { cn } from '@/lib/utils'
```

### React Conventions
- Functional components with hooks only (no class components)
- Use `useState`, `useEffect`, `useRef` for state/side effects
- Components should be under 100 lines - split if larger
- Use `PropTypes` for prop validation if needed

### Styling Rules
- **Tailwind CSS only** - no custom CSS files
- Use `cn()` from `lib/utils.js` for conditional classes
- Dark theme by default
- Responsive design: mobile-first approach
- **Never use inline styles**
- Never use `!important`

### Error Handling
- Use try/catch for async operations
- Provide fallback images for broken images
- Handle form submission errors gracefully
- Log errors to console for debugging

## Adding Magic UI Components

1. Visit https://magicui.design/docs/components/<component-name>
2. Copy source code to `src/components/magicui/<component-name>.jsx`
3. Convert TypeScript to JavaScript (remove types, interfaces)
4. Replace `import { cn } from "@/lib/utils"` with actual import
5. Import using: `import { ComponentName } from '@/components/magicui/component-name'`
6. **NEVER** install Magic UI as npm package

## Component Best Practices

| Section | Recommended Component | URL Slug |
|---------|----------------------|----------|
| Hero | BlurFade, AnimatedBeam | blur-fade, animated-beam |
| About | NumberTicker, Marquee | number-ticker, marquee |
| Journey | Timeline, BentoGrid | timeline, bento-grid |
| Skills | IconCloud, OrbitCircles | icon-cloud, orbiting-circles |
| Projects | BorderBeam, BlurFadeIn | border-beam, blur-fade-in |
| Contact | ShimmerButton | shimmer-button |
| Background | DotPattern, AnimatedGridPattern | dot-pattern, animated-grid-pattern |

## Agent Checklist

### Always Do
- [ ] Check if component already exists before adding
- [ ] Place Magic UI in `src/components/magicui/`
- [ ] Place shadcn/ui in `src/components/ui/`
- [ ] Use existing data files instead of hardcoding
- [ ] Maintain dark theme consistency
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Run `npm run build` to verify no errors
- [ ] Preserve existing working components

### Never Do
- [ ] Install Magic UI as npm package
- [ ] Use TypeScript syntax (.tsx, interfaces, types)
- [ ] Create custom CSS files
- [ ] Move shadcn/ui components to magicui folder
- [ ] Create a Blog section
- [ ] Use class components
- [ ] Delete existing working components
- [ ] Hardcode data that exists in data files
- [ ] Use inline styles

## Performance

- Lazy load images with fallback
- Use `React.lazy` for heavy components
- Optimize Magic UI animations for 60fps
- Keep bundle size minimal
- Use `content-visibility: auto` for sections

## Git Workflow

- Keep component changes in atomic commits
- Run `npm run build` before committing to verify
- Include `.opencode/` in `.gitignore`
