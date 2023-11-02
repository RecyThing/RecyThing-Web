# RecyThing - Website (Admin)

## Table of Contents

- [RecyThing - Website (Admin)](#recything---website-admin)
  - [Table of Contents](#table-of-contents)
  - [How To Export Your Modules (Re-exporting)](#how-to-export-your-modules-re-exporting)
  - [Naming Conventions](#naming-conventions)
  - [Project Documents](#project-documents)
  - [References](#references)

## How To Export Your Modules (Re-exporting)

_Why do we need to re-export our modules?_

> We need to re-export our modules so that we can import them from a single file instead of importing them from multiple files.

_How to re-export our modules?_

1. create a folder named `button` in `src/components`
2. create a file named `index.js` in `src/components/button` for re-exporting your button component
3. create a file named `YourButton.js` in `src/components/button` for your button component
4. in `src/components/button/YourButton.js`:

   > this file will act as your button component

   ```js
   import React from "react";

   export function YourButton() {
   	return <button>Your Button</button>;
   }
   ```

5. in `src/components/button/index.js`:

   > this file will act as a re-exporter for your button component

   ```js
   export { YourButton } from "./YourButton";
   // or if you have multiple components in this folder
   export * from "./YourButton";
   ```

6. lastly, in `src/components/index.js`:

   > this file will act as a re-exporter for all your other components

   ```js
   export * from "./button";
   ```

7. now you can import your button component from `src/components` in any file:

   > example: we want to import our button component in `src/pages/Page.js`

   ```js
   import { YourButton } from "../components";

   export function Page() {
   	return <YourButton />;
   }
   ```

8. file structure will look like this:

   ```bash
   src
   ├── components
   │   ├── button
   │   │   ├── YourButton.js # your button component
   │   │   ├── YourOtherButton.js
   │   │   ├── ...
   │   │   └── index.js # re-exporter for your button components
   │   ├── other-component
   │   │   ├── ...
   │   └── index.js # we will import our components from this file
   └── pages
       └── Page.js
   ```

---

## Naming Conventions

> In this project, we use [PascalCase](https://en.wikipedia.org/wiki/PascalCase) for naming our files and we use [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) for naming our folders.

---

## Project Documents

- [Figma](https://www.figma.com/file/MNMdvvfmCZVFc6HRsjrcCy/Recything-Design?type=design&node-id=1-3&mode=design&t=pimRrZcLkCqLhSpF-0)
- [Trello](https://trello.com/b/QBUvaFOh/recything-web)
- [Software Requirement Specification](https://docs.google.com/document/d/1xQdsNs_42wmlnQ73Ue3aHJNr0KqgJbSCxgM5B0stt7k/edit#heading=h.1erwhldcnuec)

---

## References

- [Chakra UI](https://chakra-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
