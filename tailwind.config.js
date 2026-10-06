import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dasara: {
          maroon: '#6B0B24',       // Royal Kumkuma Maroon (Primary brand)
          deepCrimson: '#420614',  // Deep contrast festive background
          gold: '#D4AF37',         // Pure Temple Zari Gold
          goldLight: '#F7E7A9',    // Shimmer highlight
          peacock: '#0D5C75',      // Peacock Teal (Auspicious secondary)
          emerald: '#0B4D3C',      // Deep Silk Green
          haldi: '#E5A93C',        // Festive Turmeric Gold
          champagne: '#FAF6F0',    // Silk Ivory (Text and light cards)
          obsidian: '#121013',     // Rich dark base
          cardBg: '#1A1518',       // Card surface base
          borderGold: 'rgba(212, 175, 55, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)' },
        }
      }
    }
  },
  plugins: [tailwindcssAnimate],
};
