# Suresh's Professional Portfolio

A modern, responsive software engineer portfolio built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark theme with gradient accents, and a professional design.

## 🚀 Features

- **Modern Dark Theme** - Sleek dark interface with vibrant gradient accents
- **Smooth Animations** - Framer Motion animations for engaging interactions
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile
- **Performance Optimized** - Built with Vite for fast load times
- **Professional Sections**:
  - Hero section with call-to-action
  - About me section
  - Skills grid
  - Experience timeline
  - Featured projects showcase
  - Contact form
  - Footer with social links

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: React Icons
- **Linting**: ESLint

## 📦 Installation

1. **Clone or setup the project**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The portfolio will open automatically at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar with mobile menu
│   ├── Hero.tsx            # Hero section with CTA
│   ├── About.tsx           # About me section
│   ├── Skills.tsx          # Skills grid
│   ├── Experience.tsx      # Experience timeline
│   ├── Projects.tsx        # Project showcase
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer with social links
├── App.tsx                 # Main app component
├── main.tsx                # React entry point
└── index.css              # Global styles & animations
```

## 🎨 Customization

### Update Your Information
- Edit component text in `src/components/`
- Update social links in `Hero.tsx` and `Footer.tsx`
- Add your projects in `Projects.tsx`
- Update experience in `Experience.tsx`
- Customize skills in `Skills.tsx`

### Modify Theme
- Colors are in `tailwind.config.js`
- Adjust gradients and animations in `src/index.css`

### Contact Form
- The form is functional and displays success message
- To enable email sending, integrate with a service like:
  - EmailJS
  - Formspree
  - SendGrid
  - Your own backend API

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Vercel will auto-build and deploy

### Deploy to Netlify
1. Run `npm run build`
2. Drag `dist/` folder to Netlify
3. Or connect GitHub for continuous deployment

### Deploy to GitHub Pages
1. Update `vite.config.ts` with your repo name
2. Run `npm run build`
3. Push to `gh-pages` branch

## 📝 License

This portfolio is open source and available for personal use.

## 🤝 Support

For any questions or improvements, feel free to reach out through the contact form on the portfolio.

---

**Made with ❤️ using React, TypeScript & Tailwind CSS**
