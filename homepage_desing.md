# B2M — Brand Colour Palette
**Beaches2Mountains** · Brand Guidelines · Colour System

---

## Brand Essence

> A modern travel brand that represents the journey from serene beaches to adventurous mountains — combining exploration, movement, freedom, and premium curated experiences.

---

## Primary Colour Palette

### 🟦 Ocean Blue
| Property | Value |
|---|---|
| HEX | `#165D91` |
| RGB | `22, 93, 145` |
| HSL | `hsl(207, 74%, 33%)` |
| CSS Variable | `--color-ocean-blue: #165D91;` |

**Role:** Primary brand colour. Used for main UI elements, CTAs, headers, and navigation.  
**Meaning:** Trust, travel, and depth.

---

### 🩵 Sky Blue
| Property | Value |
|---|---|
| HEX | `#8CB5D5` |
| RGB | `140, 181, 213` |
| HSL | `hsl(207, 43%, 69%)` |
| CSS Variable | `--color-sky-blue: #8CB5D5;` |

**Role:** Secondary brand colour. Used for backgrounds, cards, hover states, and illustrations.  
**Meaning:** Calmness and openness.

---

### 🟡 Sun Gold
| Property | Value |
|---|---|
| HEX | `#F5B33D` |
| RGB | `245, 179, 61` |
| HSL | `hsl(38, 90%, 60%)` |
| CSS Variable | `--color-sun-gold: #F5B33D;` |

**Role:** Accent colour. Used sparingly for highlights, badges, icons, and emphasis.  
**Meaning:** Warmth, discovery, and positivity.

---

### ⬜ White
| Property | Value |
|---|---|
| HEX | `#FFFFFF` |
| RGB | `255, 255, 255` |
| HSL | `hsl(0, 0%, 100%)` |
| CSS Variable | `--color-white: #FFFFFF;` |

**Role:** Background and text on dark surfaces. Used to create breathing room and minimalism.  
**Meaning:** Clarity and minimalism.

---

## Recommended Colour Ratio

```
████████████████████████████████████████████████████████████████████  70%  Blue tones (Ocean Blue + Sky Blue)
████████████████████  20%  White
██████████  10%  Sun Gold
```

| Colour | Proportion | Usage |
|---|---|---|
| Blue tones (Ocean + Sky) | **70%** | Backgrounds, UI surfaces, navbars, cards |
| White | **20%** | Page backgrounds, text, negative space |
| Sun Gold | **10%** | Accents, icons, highlights, CTAs |

---

## CSS Custom Properties (Ready to Use)

```css
:root {
  /* B2M Brand Colours */
  --color-ocean-blue:  #165D91;   /* Primary   — trust, travel, depth      */
  --color-sky-blue:    #8CB5D5;   /* Secondary — calmness, openness         */
  --color-sun-gold:    #F5B33D;   /* Accent    — warmth, discovery          */
  --color-white:       #FFFFFF;   /* Base      — clarity, minimalism        */

  /* Semantic Aliases */
  --color-primary:     var(--color-ocean-blue);
  --color-secondary:   var(--color-sky-blue);
  --color-accent:      var(--color-sun-gold);
  --color-background:  var(--color-white);
  --color-text:        var(--color-ocean-blue);
}
```

---

## Tailwind Config (if using Tailwind CSS)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#165D91',
        'sky-blue':   '#8CB5D5',
        'sun-gold':   '#F5B33D',
      },
    },
  },
}
```

---

## Colour Usage Guidelines

### ✅ Do
- Use **Ocean Blue** as the dominant colour for navigation, headers, and primary buttons.
- Use **Sky Blue** for card backgrounds, section dividers, and secondary UI elements.
- Use **Sun Gold** only as an accent — icons, badges, underlines, highlighted text, or the logo sun motif.
- Pair **White text** on Ocean Blue or Sky Blue backgrounds for accessibility.
- Follow the **70/20/10 ratio** to maintain brand consistency.

### ❌ Don't
- Use Sun Gold as a background colour for large areas.
- Mix all four colours in equal proportions — this breaks the brand hierarchy.
- Use dark or off-brand colours for body text; keep to Ocean Blue or near-black derivatives.
- Place Sky Blue text on a White background without checking contrast ratios.

---

## Contrast & Accessibility

| Combination | WCAG Contrast Ratio | Rating |
|---|---|---|
| White text on Ocean Blue `#165D91` | ~7.5:1 | ✅ AAA |
| White text on Sky Blue `#8CB5D5` | ~2.5:1 | ⚠️ AA Large only |
| Ocean Blue text on White | ~7.5:1 | ✅ AAA |
| Ocean Blue text on Sun Gold | ~3.2:1 | ✅ AA Large |
| White text on Sun Gold `#F5B33D` | ~2.2:1 | ❌ Avoid for body text |

> **Tip:** Always use Ocean Blue or White for body copy. Reserve Sky Blue and Sun Gold for decorative or large-type contexts.

---

## Typography Pairing

**Brand Font:** Neue Haas Grotesk  
Used for: Headlines · Hero sections · Campaign titles · Social media creatives

```css
/* Recommended pairing with colour */
h1, h2, h3 {
  font-family: 'Neue Haas Grotesk', sans-serif;
  color: var(--color-ocean-blue);
}

.hero-title {
  color: var(--color-white);
  background-color: var(--color-ocean-blue);
}

.accent-label {
  color: var(--color-sun-gold);
}
```

---

*Source: B2M Brand Guidelines — May 2026*