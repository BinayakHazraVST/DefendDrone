# D.E.F.E.N.D Drone Project - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from defense contractor websites (Lockheed Martin, Northrop Grumman) and patriotic government portals, combined with modern tech startup aesthetics. This creates authority and trust while maintaining contemporary appeal.

**Core Principles:**
- Precision and professionalism reflecting military-grade standards
- Patriotic pride through visual hierarchy and symbolic elements
- Technical excellence communicated through clean, structured layouts
- Trust-building through authentic imagery and transparent information

## Typography

**Font Families:**
- Headings: Rajdhani (Google Fonts) - angular, technical, military-inspired
- Body: Inter (Google Fonts) - clean, highly legible

**Hierarchy:**
- Hero Title (D.E.F.E.N.D): 5xl to 7xl, ultra-bold, letter-spacing wide
- Section Headings: 3xl to 4xl, bold, uppercase
- Subheadings: xl to 2xl, semibold
- Body Text: base to lg, regular weight, line-height relaxed
- Captions/Labels: sm, uppercase, tracking-wide

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-8 to p-16
- Section spacing: py-20 to py-32
- Grid gaps: gap-8 to gap-12
- Container max-width: max-w-7xl

## Page Structure

### 1. Hero Section (Full Viewport)
- Full-screen autoplay video background showing drone in flight (muted, looped)
- Dark overlay (40% opacity) for text readability
- Centered content with D.E.F.E.N.D acronym breakdown vertically aligned
- Primary CTA button with blurred background
- Subtle downward scroll indicator

### 2. Mission Statement Section
- Two-column layout (text left, supporting graphic/drone silhouette right)
- Patriotic messaging emphasizing national security and innovation
- Key statistics in badge format (years in service, units deployed, success rate)

### 3. Technology Showcase
- Three-column grid featuring drone capabilities
- Each card includes icon, capability name, and brief description
- Technical specifications in clean data tables
- 3D rotating drone visualization or technical diagrams

### 4. Development & Deployment (Image Gallery)
- Split section design:
  - Left: "Engineering Excellence" - 2-column grid of engineers in lab/workshop
  - Right: "In Action" - Army officials operating drones in field
- Caption overlays on images describing context
- Alternating layout creates visual interest

### 5. Team/Partners Section
- Logo grid of defense partners and collaborators
- Brief credential statements
- Government certifications and compliance badges

### 6. Contact Section (Two-Column)
- Left Column: Contact form (Name, Email, Organization, Message, Security clearance level dropdown)
- Right Column: 
  - Headquarters address with map placeholder
  - Phone numbers (General, Sales, Support)
  - Email addresses
  - Office hours
  - Social media links (LinkedIn, Twitter)

### 7. Footer
- Multi-column layout: Quick Links | Resources | Legal | Newsletter signup
- Security/compliance logos
- Copyright and classification level notice

## Component Library

**Navigation:**
- Fixed transparent header becoming solid on scroll
- Logo left, nav links center, CTA button right
- Hamburger menu for mobile with slide-in panel

**Buttons:**
- Primary: Blurred glass-morphism background when over images, otherwise solid
- Secondary: Outlined with hover fill
- Icon buttons for social links

**Cards:**
- Subtle border, slight shadow
- Hover state: lift effect with increased shadow
- Image cards: overlay gradient for text readability

**Forms:**
- Full-width inputs with clear labels above
- Focus states with patriotic accent borders
- Submit button spans full width on mobile

## Images

**Hero Video:**
Description: High-definition footage of advanced military drone flying at golden hour, executing precise maneuvers, showing multiple angles including close-ups of propellers and wide shots against dramatic sky. Should convey power, precision, and cutting-edge technology.
Placement: Full-screen background in hero section

**Engineers Section (4 images needed):**
1. Engineers examining drone components under bright lab lighting
2. Team collaborating around technical blueprints with drone prototypes visible
3. Close-up of hands assembling precision drone electronics
4. Testing facility with drone in flight cage during calibration
Placement: 2x2 grid in left half of Development & Deployment section

**Military Deployment (4 images needed):**
1. Army personnel launching drone in field operation
2. Command center with officials monitoring drone feeds on screens
3. Drone landing with military personnel in background
4. Officer using tablet controller with drone hovering nearby
Placement: 2x2 grid in right half of Development & Deployment section

**Supporting Graphics:**
- D.E.F.E.N.D logo (shield with drone silhouette, stars, stripes elements)
- Technical wireframe drone renders for backgrounds
- Subtle patriotic patterns (stars, geometric military badges) as section dividers

## Accessibility & Performance

- All images include descriptive alt text emphasizing security and innovation
- Video includes fallback poster image
- Form labels clearly associated with inputs
- Minimum touch target size of 44x44px for all interactive elements
- Semantic HTML structure with proper heading hierarchy