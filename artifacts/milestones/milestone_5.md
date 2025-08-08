### Milestone 5: API Integration & Live Transcription Display
#### Objective
To send the captured audio data to the backend transcription service and display the returned text in the UI, completing the primary end-to-end user flow.

#### User Story / Spec Reference
*   **User Story:** As a user, I want to see the transcribed text appear on the screen in near real-time as I speak.
*   **API Integration:** The component must successfully interact with the `POST /api/v1/transcribe` endpoint at `http://localhost:8000`.

#### Technical Implementation Plan

1.  **Create an API Client Service:**
    *   Create a new file `src/services/api.ts`.
    *   Export an async function `transcribeAudio(audioBlob: Blob): Promise<string>`.
    *   This function will use the `fetch` API.
    *   It will create a `FormData` object and append the `audioBlob` to it.
    *   It will send a `POST` request to `http://localhost:8000/api/v1/transcribe`.
    *   It will handle the JSON response, expecting an object like `{ "transcription": "..." }`.
    *   It will include error handling for network failures or non-200 status codes, throwing an error that can be caught by the component.
2.  **Modify `SpeechToText.tsx`:**
    *   Import the `transcribeAudio` service.
    *   After `stopRecording` is called and the `audioBlob` is available, change the state to `loading`.
    *   Call `transcribeAudio` with the `audioBlob`.
    *   Use a `try...catch` block for the API call.
        *   **On success:** Set the returned text into the `transcription` state and change the status to `idle`.
        *   **On failure:** Set the `error` state with a message like "Transcription service is currently unavailable. Please try again later." and change the status to `error`.
3.  **Proxy Configuration (Vite):**
    *   To avoid CORS issues during development, configure a proxy in `vite.config.ts`.
    *   Requests made from the frontend to `/api` will be forwarded to `http://localhost:8000`.
    *   Update the `transcribeAudio` function to call `/api/v1/transcribe` instead of the full URL.

#### File Manifest
```
.
├── src/
│   ├── services/
│   │   └── api.ts
│   └── SpeechToText.tsx (modified)
└── vite.config.ts (modified)
```

#### Acceptance Criteria / Tests
1.  **API Call:** When recording is stopped, a `POST` request must be sent to the backend API with the audio data.
2.  **Successful Transcription:** If the API returns a successful response, the transcription text must appear in the `TranscriptionDisplay` area.
3.  **API Error Handling:** If the API call fails (e.g., the backend server is down), the component must enter the `error` state and display the appropriate service unavailable message.
4.  **Loading State:** The UI must show a `loading` state (e.g., disabled button) while the API call is in progress.
5.  **E2E Test (Playwright):**
    *   The test will need to mock the `POST /api/v1/transcribe` endpoint.
    *   Create a test that simulates the full flow: click start, stop, and verify that the mocked transcription text is correctly rendered in the display area.
    *   Create a second test that mocks a 500 error from the API and verifies that the component displays the correct error message.