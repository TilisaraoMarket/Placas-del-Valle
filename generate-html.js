import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Header from './src/components/Header';
import HeroSection from './src/components/HeroSection';
import ProductsSection from './src/components/ProductsSection';
import AboutUsSection from './src/components/AboutUsSection';
import ContactSection from './src/components/ContactSection';
import Footer from './src/components/Footer';
import { execSync } from 'child_process';
import fs from 'node:fs'

// Execute Tailwind CLI to generate the CSS
execSync('npx tailwindcss -i src/styles.css -o public/styles.css -m');

// Read the generated CSS
const css = fs.readFileSync('public/styles.css', 'utf-8');

// Function to generate HTML for a specific page
function generatePageHTML(title, content) {
  const headerHTML = ReactDOMServer.renderToString(<Header />);
  const footerHTML = ReactDOMServer.renderToString(<Footer />);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Placas del Valle Gastón</title>
      <style>${css}</style>
    </head>
    <body>
      ${headerHTML}
      <main>
        ${content}
      </main>
      ${footerHTML}
    </body>
    </html>
  `;
}

// Generate index.html (Home page)
const indexHTML = generatePageHTML(
  'Inicio',
  ReactDOMServer.renderToString(<HeroSection />)
);
fs.writeFileSync('public/index.html', indexHTML);

// Generate productos.html (Products page)
const productosHTML = generatePageHTML(
  'Productos',
  ReactDOMServer.renderToString(<ProductsSection />)
);
fs.writeFileSync('public/productos.html', productosHTML);

// Generate nosotros.html (About Us page)
const nosotrosHTML = generatePageHTML(
  'Sobre Nosotros',
  ReactDOMServer.renderToString(<AboutUsSection />)
);
fs.writeFileSync('public/nosotros.html', nosotrosHTML);

// Generate contacto.html (Contact page)
const contactoHTML = generatePageHTML(
  'Contacto',
  ReactDOMServer.renderToString(<ContactSection />)
);
fs.writeFileSync('public/contacto.html', contactoHTML);
