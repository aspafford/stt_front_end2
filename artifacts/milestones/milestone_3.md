### Milestone 3: Core State Management & UI Logic
#### Objective
To implement the client-side state machine that manages the component's various states (`idle`, `recording`, `loading`, `error`) and to wire this logic to the UI components, making the interface dynamic.

#### User Story / Spec Reference
*   **User Flow:** The component must transition between Idle, Recording, and Error states.
*   **State Management:** The component must manage its internal states effectively.
*   **Textual Wireframes:** The UI must change to reflect the current state (e.g., button text changes to "Stop Recording").

#### Technical Implementation Plan

1.  **Define State:**
    *   In `SpeechToText.tsx`, use the `useState` hook to manage the application's core state.
    *   Define a type for the possible states: `type Status = 'idle' | 'recording' | 'loading' | 'error';`.
    *   `const [status, setStatus] = useState<Status>('idle');`
    *   Use another `useState` for the transcription text: `const [transcription, setTranscription] = useState<string>('');`
    *   Use another `useState` for the error message: `const [error, setError] = useState<string | null>(null);`
2.  **State Transition Logic:**
    *   Create a master `handleRecordClick` function in `SpeechToText.tsx`.
    *   This function will contain a `switch` statement based on the current `status`.
        *   `case 'idle'`: `setStatus('recording');`
        *   `case 'recording'`: `setStatus('loading');` (Simulating the finalization step). Then, after a `setTimeout` of 1s, `setStatus('idle');`
        *   `case 'error'`: Reset state `setStatus('idle'); setError(null);`
    *   Pass this `handleRecordClick` function to the `RecordButton`'s `onClick` prop.
3.  **Conditional Rendering:**
    *   **`SpeechToText.tsx`:**
        *   Conditionally pass props to child components based on the `status`.
    *   **`RecordButton.tsx`:**
        *   Modify the component to render different text and icons based on the `status` prop.
        *   `idle` or `error`: "Start Recording" / "Try Again" with `mic` icon.
        *   `recording`: "Stop Recording" with `stop-circle` icon.
        *   `loading`: Disabled state with a spinner or altered style.
    *   **`TranscriptionDisplay.tsx`:**
        *   Modify the component to display different content.
        *   If `status === 'error'` and `error` is set, display the error message and the `alert-triangle` icon.
        *   If `transcription` has content, display it.
        *   Otherwise, display the default placeholder.
    *   **`StatusIndicator.tsx`:**
        *   Modify to display "Recording..." when `status === 'recording'`.
        *   Display nothing in other states.

#### File Manifest
*   `src/SpeechToText.tsx` (modified)
*   `src/components/RecordButton.tsx` (modified)
*   `src/components/TranscriptionDisplay.tsx` (modified)
*   `src/components/StatusIndicator.tsx` (modified)

#### Acceptance Criteria / Tests
1.  **State Transitions:**
    *   Clicking "Start Recording" changes the state to `recording`. The button updates to "Stop Recording" with the `stop-circle` icon, and the "Recording..." status text appears.
    *   Clicking "Stop Recording" changes the state to `loading` (button disabled), then back to `idle`.
2.  **Error State Handling:**
    *   A new developer-only button or function will be added temporarily to force the `error` state.
    *   When in the `error` state, the `TranscriptionDisplay` must show the error message and icon, and the button must say "Try Again". Clicking it should return to the `idle` state.
3.  **Unit Tests (Vitest):**
    *   Test the `RecordButton` component's rendering for all possible `status` props (`idle`, `recording`, `loading`, `error`).
    *   Test the `TranscriptionDisplay`'s conditional rendering for placeholder, transcription, and error content.
    *   Test the state logic in `SpeechToText` by mocking user clicks and asserting the resulting state changes.