# UX SPECIFICATION

## 1. User Flow
The user journey is designed to be simple and linear:

1.  **Initial State (Idle):** The user sees the component with a welcome message or placeholder text and a clear call-to-action button labeled "Start Recording".
2.  **Requesting Permission:** Upon the first click of the "Start Recording" button, the browser will prompt the user for microphone access.
3.  **Recording State:**
    *   Once permission is granted, the component's state changes to "Recording".
    *   The button text changes to "Stop Recording".
    *   A visual indicator (e.g., a blinking red dot) appears to confirm that audio is being captured.
    *   The transcription display area updates in near real-time as the user speaks.
4.  **Stopping Recording:** The user clicks the "Stop Recording" button.
5.  **Final State (Idle):**
    *   The component returns to its idle state.
    *   The recording indicator disappears.
    *   The button text reverts to "Start Recording".
    *   The final, complete transcription remains visible in the display area.
6.  **Error State:** If microphone access is denied or the API is unreachable, a clear, user-friendly error message is displayed within the component.

## 2. Textual Wireframes

### State: Idle / Initial
```
+---------------------------------------------------+
| [Transcription Display Area]                      |
|                                                   |
| > Your transcribed text will appear here...       |
|                                                   |
+---------------------------------------------------+
|                                                   |
|      +---------------------------------+          |
|      |       (🎙️) Start Recording      |          |
|      +---------------------------------+          |
|                                                   |
+---------------------------------------------------+
```

### State: Recording
```
+---------------------------------------------------+
| [Transcription Display Area]                      |
|                                                   |
| > The quick brown fox jumps over the lazy dog...  |
|                                                   |
+---------------------------------------------------+
|                                                   |
|      +---------------------------------+          |
|      |        (■) Stop Recording       |          |
|      +---------------------------------+          |
|      <🔴 Recording...>                           |
+---------------------------------------------------+
```

### State: Error
```
+---------------------------------------------------+
| [Transcription Display Area]                      |
|                                                   |
| > Could not access microphone. Please check     |
| > your browser settings and grant permission.     |
|                                                   |
+---------------------------------------------------+
|                                                   |
|      +---------------------------------+          |
|      |       (🎙️) Try Again           |          |
|      +---------------------------------+          |
|                                                   |
+---------------------------------------------------+
```