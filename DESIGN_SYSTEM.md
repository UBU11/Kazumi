# KASUMI - 1989 Retro Radio Streaming Platform
## Design System Documentation

### 🎨 **Core Aesthetic**
**1989 Analog Film Studio Tech × Modern Streaming**

A sophisticated, handcrafted UI that merges:
- Retro radio interfaces (tuner dials, frequency bars, analog meters)
- Subtle comic book influences (halftone shadows, clean outlines)
- Modern cinematic minimalism (Netflix-quality layouts)
- Monochrome dominance with minimal neon accents

---

## Color Palette

### Monochrome Base
- **Pure Black**: `#000000` - Deep backgrounds, borders
- **Graphite Darker**: `#0A0A0A` - Primary background
- **Graphite**: `#1C1C1C` - Secondary surfaces, dividers
- **Silver**: `#EDEDED` - Primary text, UI elements
- **White**: `#FFFFFF` - Highlights, accents

### Neon Accent
- **Cyan**: `#00F0FF` - Single accent color
  - Used for: active states, frequency indicators, neon glows
  - Applied sparingly for premium feel

---

## Typography

### Fonts
- **Display**: Rajdhani (700) - Uppercase headings, labels
- **Body**: Inter (300-700) - Readable content
- **Mono**: System monospace - Technical displays

### Hierarchy
```
H1: 6xl-9xl, Rajdhani, uppercase, tracking-tight
H2: 2xl, Rajdhani, uppercase, tracking-[0.2em]
Body: base, Inter, normal
Labels: xs, Rajdhani, uppercase, tracking-[0.15em]
```

---

## Key Components

### 1. **Navbar** - Radio Frequency Header
**Design Elements:**
- Slim horizontal bar (64px height)
- Radio knob logo with rotating animation
- Frequency selector navigation (tuner marks below)
- Search styled as "tuning window"
- Favorites icon with frequency spike animation

**Interactions:**
- Hover: Analog jitter effect
- Active: Cyan frequency indicator line
- Search focus: Expanding width + frequency bar

### 2. **Hero Section** - Cinematic Display
**Design Elements:**
- Full-screen monochrome poster (grayscale filter)
- Subtle halftone overlay (4px dots, 10% opacity)
- Analog tuner progress bar (vote rating)
- Speech bubble genre tags
- Scanline effect (2px cyan line, 8s animation)
- Frequency bars at bottom (40 bars, pulsing)

**Layout:**
- Title: 9xl, multi-color shadows
- Metadata: Radio display style with dividers
- Synopsis: Radio panel frame
- Buttons: Radio knob aesthetic

### 3. **Media Cards** - Poster Frames
**Design Elements:**
- Comic outline (1.5px black border + shadow)
- Monochrome poster (grayscale 100%)
- Halftone corner accent (top-right, subtle)
- Neon rim on hover (cyan glow)
- Radio knob play button (center)
- Frequency bars (8 bars, animated)

**Hover State:**
- Scale: 1.03
- Y-offset: -4px
- Neon border appears
- Content fades in
- Analog jitter animation

### 4. **Carousel** - Horizontal Scrolling
**Design Elements:**
- Title with frequency indicator line
- Radio knob navigation buttons
- Bottom frequency line separator
- Smooth scroll behavior

**Navigation:**
- Left/Right radio knobs
- Opacity 0 → 100 on group hover
- Analog jitter on click

---

## Motion & Animation

### Framer Motion Effects

#### Page Transitions
```typescript
// Tuner slide effect
initial: { opacity: 0, x: -100 }
animate: { opacity: 1, x: 0 }
transition: { duration: 0.8, ease: 'easeOut' }
```

#### Hover Animations
```typescript
// Analog jitter
whileHover: { scale: 1.03, y: -4 }
// With CSS class: .analog-jitter
```

#### Modal Entry
```typescript
// CRT power-on
className: "crt-power-on"
// Scales from center with vertical squeeze
```

### CSS Animations

#### Frequency Pulse
```css
@keyframes frequency-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
```

#### Scanline
```css
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

#### Neon Flicker
```css
@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}
```

---

## Special Effects

### 1. **Grain Texture**
- SVG noise filter overlay
- 3% opacity
- Pulsing animation (8s)
- Fixed position, full viewport

### 2. **Vignette**
- Radial gradient from center
- 40% black at edges
- Fixed position overlay

### 3. **Frequency Lines**
- Vertical lines every 10px
- 5% opacity
- Background pattern

### 4. **Halftone Shadows**
- Radial gradient dots (4px spacing)
- Applied to key elements
- 40% black opacity

### 5. **Radio Knob**
```css
.radio-knob {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #EDEDED, #1C1C1C);
  border: 2px solid #000;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
}
/* Cyan indicator line at top */
```

### 6. **Speech Bubble Tags**
```css
.speech-tag {
  background: #1C1C1C;
  border: 1px solid #EDEDED;
  padding: 4px 12px;
  font-size: 11px;
}
/* Triangle pointer at bottom */
```

---

## Loading States

### Frequency Bar Loader
```tsx
<div className="flex items-end gap-1 h-20">
  {[...Array(12)].map((_, i) => (
    <motion.div
      className="w-2 bg-[#00F0FF]"
      animate={{ height: ['20%', '100%', '20%'] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
    />
  ))}
</div>
<p>TUNING FREQUENCY...</p>
```

---

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px - Simplified layout
- **Tablet**: 768px - 1024px - Condensed spacing
- **Desktop**: > 1024px - Full experience
- **Max Width**: 1920px - Centered container

### Mobile Adaptations
- Navbar: Reduced height, simplified search
- Hero: Smaller title (6xl), stacked layout
- Cards: 2-column grid
- Carousels: Horizontal scroll, touch-friendly

---

## Accessibility

### Contrast Ratios
- Text on dark: 14:1 (WCAG AAA)
- Cyan accent: 7:1 (WCAG AA)
- All interactive elements: 4.5:1 minimum

### Focus States
- Cyan outline (2px)
- Neon glow effect
- Keyboard navigable

### Screen Readers
- Semantic HTML
- ARIA labels on icons
- Alt text on images

---

## Performance

### Optimizations
- Lazy load images
- Intersection Observer for animations
- CSS transforms (GPU accelerated)
- Debounced scroll handlers
- Memoized components

### Bundle Size
- CSS: ~40KB (gzipped: 8KB)
- JS: ~405KB (gzipped: 130KB)
- Fonts: Preloaded, subset

---

## Implementation Notes

### Critical CSS Classes
```css
.radio-frame - Border + gradient background
.radio-knob - Circular dial with indicator
.frequency-lines - Vertical line pattern
.halftone-shadow - Dot pattern shadow
.neon-glow - Cyan glow effect
.analog-jitter - Hover shake animation
.scanline - CRT scan effect
.speech-tag - Minimal speech bubble
.comic-outline - Black border + shadow
```

### Motion Principles
1. **Subtle** - No aggressive animations
2. **Analog** - Slight imperfections (jitter)
3. **Purposeful** - Every animation has meaning
4. **Premium** - Smooth, polished transitions

---

## Future Enhancements

### Planned Features
1. **Search Page** - Radio station tuning interface
2. **Details Page** - CRT-framed content
3. **Player Page** - Retro TV frame with scanlines
4. **Favorites** - Analog meter progress bars
5. **Modals** - CRT power-on animation

### Advanced Effects
- GSAP for complex animations
- Grain pulsing (subtle)
- Frequency bar audio visualization
- Analog meter needle animations

---

## Design Philosophy

**"1989 Film Studio Tech Meets Modern Streaming"**

This UI is:
- ✅ Handcrafted and intentional
- ✅ Premium and sophisticated
- ✅ Monochrome with minimal accent
- ✅ Retro but not nostalgic
- ✅ Modern but not sterile

This UI is NOT:
- ❌ Noisy or cluttered
- ❌ Childish or playful
- ❌ Over-saturated with color
- ❌ Generic or template-like

---

**Built with precision for KASUMI** 📻✨
