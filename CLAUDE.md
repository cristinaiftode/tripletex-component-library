# CLAUDE.md - Tripletex Component Library Rules

## STRICT EXTRACTION RULES

### DO NOT
- Add extra wrapper elements not in the Figma design
- Add placeholder content or demo data
- Add icons, images, or decorations not in the original
- Invent additional props or variants
- Add hover/focus states unless shown in Figma variants
- Add animations unless specified
- Guess at functionality - ASK if unclear

### DO
- Extract ONLY elements visible in the Figma screenshot
- Use EXACT prop names from Figma variants
- Use CSS variables for ALL tokens (never hardcode)
- Keep components focused and single-purpose
- Match Figma layer names when possible
- Include TypeScript types for all props

## COMPONENT GENERATION PATTERN

For each component:
1. Use Figma MCP `get_design_context` to get screenshot + code hints
2. Extract ONLY what's shown - nothing more
3. Map Figma variants to React props
4. Use CSS variables from tokens/
5. Export with TypeScript types

## TOKEN USAGE

```tsx
// WRONG - hardcoded
<button style={{ backgroundColor: '#4573D2' }}>

// CORRECT - CSS variable
<button style={{ backgroundColor: 'var(--color-primary)' }}>
```

## FILE NAMING
- Components: PascalCase.tsx (Button.tsx, InputField.tsx)
- Tokens: kebab-case.css (colors.css, typography.css)
- Barrel exports: index.ts

## WHEN USING FIGMA MCP

1. Call `search_design_system` first to find component
2. Use `get_design_context` with the node ID
3. Extract ONLY what the screenshot shows
4. If design is unclear, ASK before assuming

## FIGMA SOURCE

- File Key: `4WZWeGkM9pNR8Y0c3X8z3H`
- Library Key: `lk-7c7e58e347fc69a0e6119bc6175e28d8a30a1a6f84acaf098fd9627b3af1c5631355e19621e577ed7259c6ccab4284e2936dc4c1ace7da2316045749b7d881bf`
- Primary library: Atlas Library
