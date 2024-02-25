# Client

## Tools

### `ESLint`

- What:
  - Linting tool for JavaScript
- Purpose:
  - Identify and report patterns found in ECMAScript / JS code, with the code of making code more consistent and avoid bugs
- Other notes:
  - There are conflicts between `prettier` and `EsLint` in indentation
    - To prevent conflicts, extend `prettier` in `.eslintrc.json`
  - Prettier will reformat the code to be consistent in style
    - There could be some cases where `Prettier` reformats wrong code
  - ESLint will analyze the meaning of code and catch potential problems
- Resources
  - https://glebbahmutov.com/blog/configure-prettier-in-vscode/

## Libraries

### `Radix UI`

- What:
  - Unstyled library, providing functionality

### `Tailwind CSS`

- What:
  - Utility-first CSS framework to style with pre-defined utility classes
  - It does not work like a regular CSS library, it is not just a collection of styles that we include in our CSS
    - We need to properly transpile the code using Tailwind classes to get working styles as a result
- How:
  - Scans HTML templates and extracts the utility classes used
  - There are several ways to use Tailwind CSS, the recommended method is:
    - Use `PostCSS` preprocessor and a dedicated plugin to convert the utility classes into optimized, production-ready CSS styles
      - The preprocessor works like other tools of this type (e.g.: `SCSS or LESS`) - takes our code and with appropriate logic, transpiles to pure CSS
      - `PostCSS` has the advantage of being fully extensible
        - Can write plugins for it and expand its capabilities depending on our needs (similar to `Babel` or `Eslint`)
  - Setup (For CRA):
    - Using `CRACO` to override configurations in CRA:
      - `require('tailwindcss')`: Tailwind CSS transpiler
      - `require('autoprefixer')`: ensure all CSS attributes will be generated in versions for all browsers that should be supported
    - Add `Tailwind` settings file: `npx tailwindcss init`
    - Add the files that use `Tailwind` classes into `purge` field in `tailwind.config.js`
    - Indicate where we want to include `Tailwind` framework in our application:
      - M1: Add `PostCSS` understandable instructions in one of the CSS files:
      ```css
      /* This injects Tailwind's base styles and any base styles registered by plugins. */
      @tailwind base;
      /* This injects Tailwind's component classes and any component classes registered by plugins. */
      @tailwind components;
      /* This injects Tailwind's utility classes and any utility classes registered by plugins. */
      @tailwind utilities;
      ```
      - M2: Import the all-in-one set into a JS/TS file:
      ```js
      import 'tailwindcss/tailwind.css';
      ```
- Benefits:
  - Responsiveness and different states of elements are often the weakest elements of many low-level CSS frameworks, but Tailwind CSS has good support for this
  - Allow overriding of default `Tailwind` breakpoints (i.e. `sm`, `md` etc) in `tailwind.config.js`
  - `Tailwind` helps us create our own class sets for cases where `Tailwind` does not have all the CSS attributes / cases that meet our needs
    - Can order `Tailwind` to generate single classes / whole sets of classes with different prefixes - through `@layers`
- Other notes:

  - It does not generate all possible combinations of CSS classes by default
    - It has the tools to remove unused classes and thus further reduce the size of the resulting source code
  - `@apply` directive

    - Used to inline any existing utility classes into own custom CSS
      - Useful when need to write custom CSS (like to override the styles in a 3rd party library) but still want to work with design tokens and use same syntax that we use in HTML
    - `@layer` directive
      - Used to tell `Tailwind` which "bucket" a set of custom styles belong to
      - Valid layers are base, components and utilities
      - `Tailwind` automatically moves any CSS within `@layer` to the same place as `@tailwind` rule

  - Trimming classes
    - Instead of declaring 11 classes
    ```html
    <button
      class="text-white font-semibold bg-blue-500 hover:bg-blue-700
           border-blue-700 border-b hover:border-indigo-900 
           transition-all px-6 py-2 rounded-full"
    >
      Hello World
    </button>
    ```
    - Can trim by combining the atomic classes to 1 more complex class:
    ```css
    @layer components {
      .button-blue-rounded {
        @apply text-white font-semibold bg-blue-500 ...;
      }
    }
    ```
  - `Tailwind` recommends the use of `Vite, Parcel, Next.js or Remix` instead of CRA to provide more flexibility in configurations

- Resources
  - https://tsh.io/blog/tailwind-css-tutorial/

### `CRACO`

- What:
  - Create React App Configuration Override (CRACO) is a tool that provides a comprehensible configuration layer for Create React App
    - Allows the customization of configurations of React app without having to eject, which is a one-way operation that removes the single-build dependency provided by Create React App
- Purpose:
  - `react-scripts` does not allow overriding of configurations, hence CRACO comes in, to provide flexibility to customize the configurations while getting benefits of CRA
- How:
  ```json
  // In `package.json`, replace the existing call to react-scripts in your scripts section with craco:
  {
    "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test"
    }
  }
  ```
  - Existing calls to `react-scripts` are replaced with calls to the CRACO CLI
    - Allows CRACO to take control of the configurations for starting, building, testing React app
  - Example: having `Tailwind CSS and Autoprefixer` as `PostCSS` plugins and using CRACO to include them in CRA configuration (`craco.config.js`)
  ```js
  module.exports = {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    style: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  };
  ```

### `Vite`

- What:
  - Build tol that aims to provide a faster and leaner development experience for modern web projects
  - 2 major parts:
    - `Dev` server that provides rich feature enhancements over native ES modules
    - `Build` command that bundles the code with `Rollup`, pre-configured to output highly optimized static assets for production
- Benefits:
  - Platform-agnostic, can be used to develop JS/TS applications
  - Fast compilation and hot module replacement
    - Vite uses native ES modules and modern browsers APIs to compile our code on the fly, thus faster build times and instant updates in the browser
      - This eliminates the need to a bundler during development => reduces time spent on building and deploying applications
    - Built-in development server in Vite is optimized for fast reloading and hot module replacement
  - Lazy loding of modules
    - Code is only loaded when needed
    - Thus smaller bundler sizes and improved performance
    - Also resulted in faster initial load times for users
  - Tree-shaking and code splitting
    - Tree-shaking: removes unused code from the applicatkion
    - Code splitting: divide code into small, more manageable chunks loaded on demand
    - Reduces size of code and improve performance
  - Built-in development server
    - Provides fast reloading and hot module replacement
    - Easier to develop and test application, where we can see the changes to the code in real-time
- Other notes:
  - But Vite has smaller community since relatively new FE tool and has limited browser comptability
    - Some users may not be able to use the application without updating their browser or using a polyfill
  - NOTE: At the point of writing, `Vite` requires `.jsx` extension to use `JSX` syntax, see [post](https://twitter.com/youyuxi/status/1362050255009816577) - Otherwise, may see error message (in `.js` with JSX syntax): - `Uncaught SyntaxError: Unexpected token '<' (at routes.js?t=1708850801417:13:30)` - Workaround includes adding custom plugin in `vite.config.js`
    **Vite vs CRA**
    | | Vite | CRA |
    | --- | --- | --- |
    | Build system | Uses native ES modules and rollup to create a highly optimized build <br/> - Faster build times and smaller bundle sizes | Webpack to compile and optimize code |
    | Performance | Uses a faster build process and unique approach to code splitting <br/> - Faster build times and load times | Focuses more on simplicity and ease of use |
    | Tooling | Flexible and easily extensible <br/> - Allows adding and modifying plugins and configs as needed | - More opinionated <br/> - Offer a set of pre-configured tools and dependencies with limited customization options |
    | Development experience | Fast and lighweight <br/> - See changes in real-time | Slower and requires full reload to see changes
    | Learning curve | Steeper learning curve due to focus on performance and customization | Relatively low |
    | Ecosystem compatibility | Designed to work seamlessly with modern web development tools and technologies | Has a larger and more established ecosystem <br/> - More plugins, components and libraries available with the tool |

## File structure

- https://akshay-p.medium.com/a-guide-to-organizing-your-react-project-the-optimal-folder-structure-130e965a59b2
- https://blog.webdevsimplified.com/2022-07/react-folder-structure/
- https://scrimba.com/articles/react-project-structure/

## React

- Few building blocks of a web application:
  - UI
  - Routing
  - Data fetching
  - Rendering
  - Integrations (e.g.: CMS, auth, payments etc)
  - Infrastucture
  - Performance
  - Scalability
  - Developer experience
- Relatively unopinionated about other aspects of building applications
  - Hence tools like `Next.js` comes in that handles the tooling and configurations needed for React, provides additional structure, features, and optimizations

### UI

- User visits a web page > Server returns an HTML file > Browser reads the HTML and constructs the Document Object Model (DOM)
  - DOM acts as a bridge between the code and the UI
- We can update DOM with plain JS but is very verbose
  - It is an imperative way of writing
  - But declarative programming is often preferred to speed up development process, which is what React provides
- Use React components to manipulate the DOM elements
  - Require the use of `JSX`
    - But Browsers does not understand `JSX`, hence need a JS compiler (e.g.: `Babel`) to transform `JSX` to `JS`
