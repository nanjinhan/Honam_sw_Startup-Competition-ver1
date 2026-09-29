# Third-party components and assets

## Cult UI

Source: https://github.com/nolly-studio/cult-ui

- https://www.cult-ui.com/docs/components/hero-color-panels
- apps/www/registry/default/ui/hero-color-panel.tsx
- apps/www/registry/default/ui/direction-aware-tabs.tsx

Adapted to the reference's layout, a yellow palette, a React/Vite project and controlled selection. The ColorPanels visual uses @paper-design/shaders-react. Tabs reuse the motion spring selection pattern with an accessible pressed button group. License: LICENSE-CULT-UI.md.

## React Bits

Source: https://github.com/DavidHDev/react-bits

- src/ts-default/TextAnimations/BlurText/BlurText.tsx
- src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx
- src/ts-default/Components/SpotlightCard/SpotlightCard.tsx and .css

AnimatedContent adds a reduced-motion path. SpotlightCard styling is overridden in the application stylesheet. License: MIT + Commons Clause, preserved in LICENSE-REACT-BITS.md. Components are included as part of this application, not distributed as a standalone component product.

## Images

Existing Unsplash image URLs from the user's reference source, downloaded as local assets:

- photo-1535189043414-47a3c49a0bed — hanok.jpg
- photo-1523760957528-55d1d540360d — courtyard.jpg
- photo-1581958414928-f410016e5988 — cafe.jpg
- photo-1498654896293-37aacf113fd9 — food.jpg

These illustrate the design mood, not verified venue photography. The UI discloses this in venue details.

## Other dependencies

React, Vite, Tailwind CSS, Motion, GSAP, Lucide React, Paper Design Shaders, Pretendard. Refer to each installed package's license. Pretendard is loaded from its public CDN stylesheet.
