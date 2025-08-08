### Milestone 1: Setup Containerized Development Environment & Testing Harness
#### Objective
To create a reproducible, containerized development environment using VS Code Dev Containers. This milestone establishes the project structure, installs all necessary dependencies, and configures the basic Vite, Vitest, and Playwright testing harnesses.

#### User Story / Spec Reference
*   **Technical Requirement:** The component must be built using React.
*   **Technical Requirement:** Must function correctly on the latest versions of modern web browsers.
*   **Principle:** The Container is the Foundation.

#### Technical Implementation Plan

1.  **Initialize Project:** Use `Vite` to scaffold a new React project with the TypeScript template.
2.  **Create Dev Container:**
    *   Create a `.devcontainer` directory.
    *   Inside, create a `devcontainer.json` file. This file will configure a container with Node.js 20.
    *   It will specify VS Code extensions to install (e.g., ESLint, Prettier).
    *   It will define a `postCreateCommand` to run `npm install`.
    *   It will define a `forwardPorts` for the Vite dev server (port `5173`).
3.  **Install Dependencies:**
    *   **Core:** `react`, `react-dom`.
    *   **Development:** `vite`, `@vitejs/plugin-react`, `typescript`, `eslint`, `prettier`.
    *   **Testing:** `vitest`, `jsdom` (for Vitest), `@testing-library/react`, `@playwright/test`.
    *   **Icons:** `lucide-react`.
4.  **Configure Vite:**
    *   In `vite.config.ts`, configure the server to run on host `0.0.0.0` to be accessible from the container.
    *   Set up the Vitest plugin for in-IDE testing.
5.  **Configure Testing:**
    *   **Vitest:** Create a `vitest.config.ts` (or add to `vite.config.ts`) to configure the test environment (e.g., `jsdom`).
    *   **Playwright:** Initialize Playwright to create its default configuration file (`playwright.config.ts`).
6.  **Create Initial "Hello World" Test:**
    *   Create a simple `App.test.tsx` file that renders the default `App` component and asserts that the initial Vite content is present. This verifies that the Vitest setup is working.
    *   Create a simple `e2e/app.spec.ts` that navigates to the home page and checks for the title. This verifies the Playwright setup.
7.  **Update `package.json`:**
    *   Add scripts for `dev`, `build`, `test:unit`, and `test:e2e`.

#### File Manifest
```
.
├── .devcontainer/
│   └── devcontainer.json
├── .vscode/
│   └── settings.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests-e2e/
│   └── app.spec.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

#### Acceptance Criteria / Tests
1.  **Environment:** The project must be fully buildable and runnable from within the defined Dev Container. Running `npm install` and `npm run dev` should succeed.
2.  **Unit Test Harness:** Running `npm run test:unit` must execute the `App.test.tsx` and pass successfully.
3.  **E2E Test Harness:** Running `npm run test:e2e` must launch a headless browser, navigate to the running Vite server's URL, and pass the initial check in `app.spec.ts`.
4.  **Dependencies:** The `package.json` must include `react`, `vite`, `vitest`, `@playwright/test`, and `lucide-react` as dependencies.