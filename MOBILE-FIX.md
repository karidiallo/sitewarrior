# Mobile UX fix

Fixes all five language pages at <=800px. Menu is a full-width dropdown below the header, closed by default. Closes on navigation, outside pointer, Escape or resizing to desktop. Flags are displayed as a second compact header row and the primary price configurator is forced into a single responsive column.

## Deployment

Replace `src/style.css` and `src/main-{en,pl,no,fr,de}.js`, then run `npm ci && npm run check && npm run build` and commit. No DNS, Vite base or workflow edits.
