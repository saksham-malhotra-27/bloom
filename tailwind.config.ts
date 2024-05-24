import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/components/button.js',
    './node_modules/@nextui-org/theme/dist/components/input.js',
    './node_modules/@nextui-org/theme/dist/components/date-picker.js',
    './node_modules/@nextui-org/theme/dist/components/input.js',
    './node_modules/@nextui-org/theme/dist/components/checkbox.js',
    './node_modules/@nextui-org/theme/dist/components/spinner.js',
  ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui(
        {
            themes: {
                light: {
                    // ...
                    colors: {
                        primary : "#F5A524",
                    },
                },
                dark: {
                    // ...
                    colors: {},
                },
                // ... custom themes
            },
        }
    )],
};
export default config;
