# Contributing to Project Sankalp

We love open source! Here's how you can help.

## Project Structure

- `/src/components/core`: Reusable atomic components.
- `/src/components/layout`: Global layout pieces (Navbar, Footer).
- `/src/components/sections`: Landing page sections.
- `/src/config`: Content configuration (Avoid hardcoding).
- `/src/hooks`: Custom React hooks.
- `/src/styles`: Tailwind globals and theme variables.

## Guidelines

- **Mobile First**: Always design for small screens before scaling up.
- **Minimalism**: Keep things clean. Avoid adding unnecessary elements.
- **Performance**: Use Framer Motion with restraint.
- **Consistency**: Use the established color palette and spacing system.

## Setup

1. Clone the repo
2. `npm install`
3. `npm run dev`

## Code Quality

- Use functional components.
- Keep components small and focused.
- Use `cn()` helper for tailwind class merging.
