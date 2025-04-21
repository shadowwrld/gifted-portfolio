
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#222845',
          foreground: '#fff'
        },
        secondary: {
          DEFAULT: '#e0e0e0',
          foreground: '#222845'
        },
        accent: {
          DEFAULT: '#f9be00',
          foreground: '#333'
        },
        highlight: {
          DEFAULT: '#51c4d3',
          foreground: '#fff'
        },
        glass: "rgba(255,255,255,0.8)",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '10%, 30%': { transform: 'scale(1.1)' },
          '20%, 40%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.15)' },
          '60%, 80%, 90%': { transform: 'scale(1)' }
        },
        'heartbeat-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '10%, 30%': { transform: 'scale(1.1)' },
          '20%, 40%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.15)' },
          '60%, 80%, 90%': { transform: 'scale(1)' }
        },
        'type': {
          to: { width: '100%' }
        },
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'slide-down': {
          from: { transform: 'translateY(-50px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        'heartbeat': 'heartbeat 1.4s infinite',
        'heartbeat-slow': 'heartbeat-slow 2.8s infinite',
        'typing': 'type 2s steps(40, end) both',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both',
        'slide-down': 'slide-down 0.7s cubic-bezier(0.4,0,0.2,1) both'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
