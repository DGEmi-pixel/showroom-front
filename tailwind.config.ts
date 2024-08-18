import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "box_1-gradient-to-r": 'linear-gradient(to right, #6c63ff, #f8a4d8)',
      },

      colors: {
        box_1: {
          'primary': '#ffffff',
          'secondary': '#dadfea',
          'bgPrimary': '#9da6b8',
          'bgSecondary': '#5a6170',
          'text_primary': '#6c63ff',
          'text-secondary': '#f8a4d8',
          'accent': '#ecf0f1'
        },
        bgPrimary: '#ecf0f1',
        silver: {
          'snow': '#fff',
          'cityLights': '#dfe4ea',
          'antiFlash': '#f1f2f6',
          'thinkleBlue': '#ced6e0',
          'electroMagnetic': '#2f3640',
        },
        sea: {
          'clearHill': '#1e90ff',
          'merchantMarineBlue': '#0652DD',
          'brightGreek': '#3742fa',
        },
        out: {
          'midnightBlue': '#2c3e50',
          'wetAslphat': '#34495e',
          'prestigeBlue': '#2f3542',
          'grisaille': '#57606f', 
          'bayWarf': '#747d8c',
          'peace': '#a4b0be',
        },
        netflixPrimary: '#E50914',
        darkGray: '#221f1f',
        dashboard: {
          'color-primary': '#3867d6',
          'color-danger': '#ff4757',
          'color-success': '#41f1b6',
          'color-warning': '#ffbb55',
          'color-white': '#fff',
          'color-info-dark': '#7d8da1',
          'color-info-light': '#dce1eb',
          'color-dark': '#363949',
          'color-light': '#848bc82e',
          'color-primary-variant': '#111e82',
          'color-dark-variant': '#677483',
          'color-background': '#f6f6f9',

          /* 
            --card-border-radius: 2rem
            --border-radius-1: 0.4rem
            --border-radius-2: 0.8
            --border-radius-3: 1.2

            --card-padding: 1.8rem
            --padding-1: 1.2rem

            --box-shadow: 0 2rem 3rem var(--color-light)

            --fonts: Poppins Light 300/Regular400/Medium500/Semibold600/Bold700/Extrabold800
          
          */
        }
      },
       /*---- Tamaño de Pantalla (Break Points) */
      screens: {
        'mobile': {'min': '320px', 'max': '650px'}, // Mobile tiene un max-width de 649px
        'tablet': {'min': '651px', 'max': '1024px'},
        'tbt': {'max': '900px'},
        'lpt': {'max': '1100px'},
        'laptop': {'min': '1025px', 'max': '1250px'}, // Laptop hasta 1249px
        'desktop': {'min': '1251px'}, // Desde 1250px en adelante
      },

      height: {
        'dashboard-main-height': 'calc(100vh + 120px)'
      },

      /*[ ] CALC PROP */
      spacing: {
        'dashboard-bar-spacing': 'calc(1rem-3px)'
      },

      boxShadow: {
        'dashboard-main-shadow': '0 2rem 3rem #848bc82e',
        'dashboard-input-shadow_1': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        'dashboard-input-shadow_2': 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
        'dashboard-input-shadow_3': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        'dashboard-input-shadow_4': '5px 15px 25px rgba(0, 0 ,0, 0.35)',
        'dashboard-modal-button-shadow': '0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1)'
      },

      transitionProperty: {
        'dashboard-width-opacity': 'width, opacity',
      },
      
      variants: { //ESTO PERMITE UTILIZAR EXTENSIONES DE PSEUDOCLASES
        extends: {
          backgroundColor: 'before',
          opacity: ['before'],
          width: ['before'],
        }
      }
    },
  },
  plugins: [],
};
export default config;
