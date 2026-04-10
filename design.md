# Hero Section Design Specification

## Overview
The hero section is a full-screen, immersive block featuring a dynamic background slider (images/video). It utilizes a modern, clean UI with white text and transparent/glassmorphism elements to ensure readability against complex backgrounds.

---

## 1. Layout Structure
*   **Container:** Full-viewport width and height (`100vw`, `100vh`).
*   **Positioning:** Elements are arranged using absolute positioning or CSS Grid/Flexbox over the background layer.
*   **Grid Division:**
    *   **Top:** Global Navigation (Logo, Links, Icons).
    *   **Left-Center:** Main Headline, Sub-headline, Call-to-Action buttons.
    *   **Bottom-Left:** Slider progress indicator.
    *   **Top-Right:** Social Proof/Statistics widget.
    *   **Bottom-Right:** Featured Project teaser card.

---

## 2. Background Layer
*   **Type:** Carousel/Slider (shows high-quality landscape and garden photography).
*   **Overlay:** Likely a subtle dark gradient overlay (e.g., `linear-gradient`) applied to ensure white text remains legible regardless of the image behind it.
*   **Animation:** Background images crossfade smoothly when transitioning between slides.

---

## 3. Components Breakdown

### A. Header / Navigation (Top)
*   **Alignment:** Flex row, `justify-content: space-between`, `align-items: center`. Contains padding on top, left, and right.
*   **Logo (Left):**
    *   Text: "leaflife" (lowercase).
    *   Icon: A minimalist leaf icon positioned to the left of the text.
    *   Color: White.
*   **Nav Links (Center):**
    *   Items: `ABOUT`, `SERVICES`, `PROJECTS`, `PAGES`, `CONTACT`.
    *   Typography: Uppercase, small font size, white text.
    *   State: The active or hovered item (e.g., "SERVICES") appears slightly bolder or has an active state indicator.
*   **User Actions (Right):**
    *   Two outline icons: User Profile icon and Search (magnifying glass) icon.
    *   Color: White outline.

### B. Main Content (Center-Left)
*   **Headline:**
    *   Text: "CREATE YOUR \n DREAM GARDEN" (Two lines).
    *   Typography: Extremely large, clean Sans-Serif font. Uppercase.
    *   Color: White.
*   **Sub-headline:**
    *   Text: "Crafting dream gardens with passion, creativity, and sustainability for over a decade with our experienced landscape artists and gardener teams."
    *   Typography: Body copy size, regular weight, readable line height.
    *   Color: White.
*   **Call to Action (CTA) Area:**
    *   Layout: Flex row, elements aligned center, gap between buttons.
    *   **Primary Button:**
        *   Text: "Get Started"
        *   Style: Solid white background block, black text. Rectangular with sharp or very slightly rounded corners. Padding for a substantial click area.
    *   **Secondary Button:**
        *   Text: "Explore Projects"
        *   Style: Transparent background, white text. Includes a solid white underline beneath the text.

### C. Social Proof Widget (Top-Right)
*   **Layout:** Stacked vertically, aligned right.
*   **Text:**
    *   "**500+**" (Large, bold, white).
    *   "Satisfied Clients" (Smaller, regular weight, white).
*   **Avatars:**
    *   Three overlapping circular outlines arranged horizontally.
    *   Style: Transparent background with white borders, representing user profile pictures.

### D. Featured Project Card (Bottom-Right)
*   **Style:** A rectangular card with a glassmorphism effect (semi-transparent dark background with background-blur).
*   **Padding:** Internal padding around the content.
*   **Content:**
    *   **Icon (Top Left):** Location pin outline icon.
    *   **Action Button (Top Right):** A circular button with an arrow pointing up-right (↗).
    *   **Title:** "Hachioji Garden" (Bold, white text).
    *   **Description:** "We design Hachioji Garden as a part of our new Landscape Design Commission in the country." (Small, white, lower-opacity text).

### E. Slider Controls (Bottom-Left)
*   **Layout:** Flex row, vertically aligned.
*   **Elements:**
    *   Current Slide Number: `02` (or `03` as it changes). Small white text.
    *   Progress Bar: A horizontal track line (thin, white, lower opacity). Inside it is an active indicator line (thicker, solid white) that scales/moves to show progress.
    *   Total Slides Number: `04`. Small white text.
*   **Interaction:** The progress bar visibly fills as the timer ticks down to the next slide transition.

---

## 4. Global Styling Notes
*   **Color Palette:**
    *   Primary Text: `#FFFFFF` (White)
    *   Primary Button Text: `#000000` (Black)
    *   Card Overlay: `rgba(0, 0, 0, 0.4)` (Approximate dark semi-transparent)
*   **Typography:** The design relies heavily on a clean, modern sans-serif font family. The hierarchy is established through drastic differences in font size and weight (massive headline vs. small body copy).
*   **Spacing:** Generous margins and padding are used. The layout feels "breathable," with elements anchored to the corners/edges but kept away from the very edges of the screen to frame the background image effectively.
