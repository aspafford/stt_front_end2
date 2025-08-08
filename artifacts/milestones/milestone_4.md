### Milestone 4: Microphone Integration & Audio Capture
#### Objective
To integrate the browser's `MediaRecorder` API to handle microphone permissions and capture audio data in a format suitable for the transcription API.

#### User Story / Spec Reference
*   **User Story:** As a user, I want to start and stop audio recording with a single click.
*   **User Flow:** Upon the first click of the "Start Recording" button, the browser will prompt the user for microphone access.
*   **Technical Requirement:** The component must handle browser microphone permissions gracefully.

#### Technical Implementation Plan

1.  **Create a Custom Hook:**
    *   Create a new file `src/hooks/useRecorder.ts`. This hook will encapsulate all `MediaRecorder` logic.
    *   The hook will expose:
        *   `status`: The current recording status.
        *   `startRecording`: A function to request mic access and start recording.
        *   `stopRecording`: A function to stop the recorder.
        *   `audioBlob`: The resulting audio data.
2.  **Implement `useRecorder` Hook:**
    *   **State:** Manage a `mediaRecorder` instance using `useRef`.
    *   **`startRecording` function:**
        *   Use `navigator.mediaDevices.getUserMedia({ audio: true })`.
        *   Wrap this in a `try...catch` block. If it fails (permission denied), set an error state.
        *   If successful, create a new `MediaRecorder` instance from the stream.
        *   Use an array `audioChunks` to store data from the `ondataavailable` event.
        *   Call `mediaRecorder.start()`.
    *   **`stopRecording` function:**
        *   Call `mediaRecorder.stop()`.
        *   In the `onstop` event handler, create a `Blob` from the `audioChunks` with the type `audio/webm`.
        *   Update the state with this new `audioBlob`.
        *   Clear the `audioChunks` array.
        *   Stop the media stream tracks to turn off the microphone indicator in the browser tab.
3.  **Integrate Hook into `SpeechToText.tsx`:**
    *   Import and use the `useRecorder` hook.
    *   Replace the mock state logic from Milestone 3 with the real state and functions from the hook.
    *   The `handleRecordClick` function will now call `startRecording` or `stopRecording`.
    *   If `startRecording` throws an error, set the main component's state to `error` with a user-friendly message like "Could not access microphone. Please check your browser settings and grant permission."

#### File Manifest
```
.
├── src/
│   ├── hooks/
│   │   └── useRecorder.ts
│   └── SpeechToText.tsx (modified)
└── ... (other existing files)
```

#### Acceptance Criteria / Tests
1.  **Permission Prompt:** On the first click of "Start Recording", the browser must prompt the user for microphone permission.
2.  **Recording State:** If permission is granted, the component's UI must enter the "Recording" state.
3.  **Stopping:** Clicking "Stop Recording" must stop the audio capture, and the browser's "microphone in use" indicator should disappear.
4.  **Error Handling:** If permission is denied, the component must enter the `error` state and display the specific microphone error message.
5.  **Data Capture:** After stopping, the `useRecorder` hook must successfully produce a `Blob` of audio data. (This can be verified by logging the blob's size and type to the console).
6.  **E2E Test (Playwright):**
    *   Create a test that uses Playwright's browser context options to grant microphone permissions automatically.
    *   The test will click "Start", wait 1 second, click "Stop", and verify that the UI transitions through the correct states (`idle` -> `recording` -> `idle`).