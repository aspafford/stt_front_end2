### Milestone 2: Static UI Implementation & Componentization
#### Objective
To build the static, non-interactive UI components based on the `Creative_Specification.md`. This milestone focuses on translating the design system into styled React components, representing the "Idle" state of the application.

#### User Story / Spec Reference
*   **Creative Direction:** "Kinetic & Vibrant"
*   **Visual North Star:** A clean, white, rounded-corner component with a vibrant gradient button.
*   **Component Styles:** Adherence to all specified styles for the container, display area, and button.
*   **Typography & Colors:** Use of the "Inter" font and the specified color palette.

#### Technical Implementation Plan

1.  **Project Structure:**
    *   Create a `src/components` directory for reusable components.
    *   Create a `src/styles` directory for global styles and CSS variables.
2.  **Global Styles & Fonts:**
    *   In `index.html`, add the Google Fonts link for 'Inter'.
    *   Create `src/styles/theme.css`. Define all colors, fonts, and spacing units from the `Creative_Specification.md` as CSS custom properties (e.g., `---neutral-900: #1A1A1A;`, `---space-4: 24px;`).
    *   Import `theme.css` into `main.tsx`.
3.  **Component Creation:**
    *   **`TranscriptionDisplay.tsx`:**
        *   A `div` styled according to the "Transcription Display Area" spec.
        *   Accepts a `text` prop.
        *   For this milestone, it will display the placeholder text: "Click the button below to start recording. Your words will appear here."
    *   **`RecordButton.tsx`:**
        *   A `button` styled according to the "Primary Button" spec, including the linear gradient background and hover effects.
        *   It will accept `status` and `onClick` props.
        *   It will use `lucide-react` to render the `mic` icon.
        *   For this milestone, it will be hardcoded to the "Idle" state, displaying "Start Recording".
    *   **`StatusIndicator.tsx`:**
        *   A `p` tag styled as "Status Text".
        *   Accepts a `status` prop.
        *   For this milestone, it will be hidden, as there is no status text in the "Idle" state.
4.  **Main Component (`SpeechToText.tsx`):**
    *   Rename `App.tsx` to `SpeechToText.tsx` and `App.css` to `SpeechToText.module.css`.
    *   Create the main container `div` styled according to the "Main Container" spec using CSS modules.
    *   Compose the `TranscriptionDisplay`, `RecordButton`, and `StatusIndicator` components.
    *   Pass hardcoded props to the children to render the default "Idle" state.
5.  **Styling:**
    *   Use CSS Modules for component-specific styles (e.g., `SpeechToText.module.css`).
    *   Use the CSS custom properties defined in `theme.css` for all styling to ensure consistency.

#### File Manifest
```
.
├── src/
│   ├── components/
│   │   ├── RecordButton.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── TranscriptionDisplay.tsx
│   ├── styles/
│   │   └── theme.css
│   ├── SpeechToText.module.css
│   ├── SpeechToText.tsx
│   ├── main.tsx
│   └── ... (other existing files)
└── index.html
```

#### Acceptance Criteria / Tests
1.  **Visuals:** The rendered `SpeechToText` component must visually match the "Idle" state described in the `Creative_Specification.md` and the "Visual North Star".
2.  **Componentization:** The UI must be broken down into `TranscriptionDisplay`, `RecordButton`, and `StatusIndicator` components.
3.  **Styling:** All colors, fonts, and spacing must use the CSS variables defined in `theme.css`.
4.  **Unit Tests (Vitest):**
    *   A test for `RecordButton` that verifies it renders the "Start Recording" text and the `mic` icon when passed an "idle" status prop.
    *   A test for `TranscriptionDisplay` that verifies it renders the correct placeholder text.
    *   A test for `SpeechToText` that verifies it correctly assembles the child components.
5.  **No Logic:** The component should have no state changes or `onClick` handlers implemented yet. It is purely presentational.