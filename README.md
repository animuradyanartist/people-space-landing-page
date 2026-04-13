# People Space — Landing Page

Marketing landing page for **People Space**, an enterprise workplace management platform covering HR, attendance, vacation planning, and organizational structure.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (`motion/react`) |
| Icons | Lucide React |
| Deploy | Netlify (auto-deploy from GitHub) |

## Getting Started

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # TypeScript type check
```

## Project Structure

```
src/
├── App.tsx              # All landing page sections and components
├── AdminBar.tsx         # Admin panel UI (content editor + branding)
├── AdminContext.tsx     # Admin state, password modal, localStorage persistence
├── Dashboard.tsx        # Demo dashboard view
├── translations.ts      # EN / AM bilingual content
└── index.css            # Global styles and Tailwind config
```

## Features

### Landing Page
- Animated hero with live dashboard mockup
- Platform overview, modules, roles, ecosystem, and business value sections
- Bilingual support (English / Armenian) via language switcher
- "Book a Demo" contact form — company name, email, company size, phone, searchable country dropdown
- Scroll progress indicator

### Admin Mode
Access via **Ctrl + Shift + A** or the hidden `⚙` button in the footer.

Password: `admin123`

Admin features:
- Edit all page content per language (EN / AM)
- Changes saved to `localStorage` — persist across page refreshes
- Reset individual sections or all content to defaults
- Branding editor: logo image upload, background color, shape

## Deployment

Connected to GitHub and auto-deploys to Netlify on every push to `master`.

- **GitHub:** [animuradyanartist/people-space-landing-page](https://github.com/animuradyanartist/people-space-landing-page)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
