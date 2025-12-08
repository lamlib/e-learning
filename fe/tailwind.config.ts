import type { Config } from 'tailwindcss';

/**
 * Tailwind configuration for Tailwind CSS v4
 * 
 * NOTE: With Tailwind v4 + @tailwindcss/postcss, design tokens are defined
 * in @theme directive in globals.css, NOT in this config file.
 * 
 * This config file is kept minimal - only for content paths if needed.
 * All design tokens with "lm" prefix are in fe/src/app/globals.css
 * 
 * Design Source: https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?node-id=169-0&m=dev
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // No theme extension needed - all tokens are in @theme in globals.css
};

export default config;

