# Client

## Initial Setup

### Tailwind

- `npx tailwindcss init -p`
  - Generate `tailwind.config.js` and `postcss.config.js`
- To fix the warning from VSCode on "Unknown at rule @tailwind" in `.css`:
  - Either replace `@tailwind base; etc` with:
  ```css
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
  ```
        - But may result in increased build time and CSS file size
  - OR add `ignore` in `settings.json`
- For `Tailwind` Intellisense, add this in `settings.json`
  ```json
  "files.associations": {
      "*.css": "tailwindcss"
  }
  ```
