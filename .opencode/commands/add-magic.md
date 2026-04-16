---
description: Add a Magic UI component to Dhvani's portfolio
---

Add the Magic UI component "$COMPONENT" to the "$SECTION" section.

## Process:
1. Check if the component already exists in src/components/magicui/
2. If it doesn't exist:
   - Go to https://magicui.design/docs/components/$COMPONENT
   - Copy the component source code
   - **Convert TypeScript to JavaScript** (remove all type annotations)
   - Save to: src/components/magicui/$COMPONENT.jsx
3. Import the component in src/components/$SECTION.jsx
4. Integrate it with existing layout and Tailwind classes
5. Ensure it matches the dark theme
6. Test it's mobile-responsive
7. Show me:
   - The import statement
   - Usage example
   - Any required props

## Important:
- This is JavaScript/JSX, NOT TypeScript
- Use cn() from '../lib/utils' for conditional classes
- Keep existing components intact
- Match the existing dark theme



