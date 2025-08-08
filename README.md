# Speech-to-Text UI Component

A polished, modern, and intuitive React component that provides seamless speech-to-text transcription with a vibrant, animated user interface.

## Features

- 🎙️ **Real-time Speech Recording** - Capture audio directly from the browser
- 📝 **Live Transcription** - Send audio to backend API for transcription
- ✨ **Kinetic Animations** - Breathing button animation, text fade-in, loading shimmer
- 🔒 **Permission Handling** - Graceful microphone permission management
- ❌ **Error Recovery** - User-friendly error messages and retry functionality
- 🎨 **Modern Design** - Vibrant gradient buttons and polished UI
- 🧪 **Comprehensive Testing** - Unit tests and E2E test coverage

## Prerequisites

- **Node.js** 18+ (recommended: 20.19+)
- **npm** or **yarn**
- **Modern Browser** (Chrome, Firefox, Safari, Edge latest versions)
- **Backend API** running on `http://localhost:8000` with `/api/v1/transcribe` endpoint

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### 3. Start Backend API (Required)

Make sure your speech-to-text API service is running on `http://localhost:8000` with the following endpoint:

```
POST /api/v1/transcribe
Content-Type: multipart/form-data
Body: audio file (Blob)

Response: { "transcription": "transcribed text" }
```

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally

### Building
- `npm run build` - Build for production (outputs to `dist/`)

### Testing
- `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run lint` - Run ESLint (may have plugin issues - see Known Issues)

### Type Checking
- `npx tsc --noEmit` - Check TypeScript compilation without emitting files

## Usage

The component provides a simple interface:

1. **Click "Start Recording"** - Browser will request microphone permission
2. **Speak** - Your speech is captured in real-time (red recording indicator appears)
3. **Click "Stop Recording"** - Audio is processed by the backend API
4. **View Transcription** - Text appears with smooth fade-in animation

### Error Handling

- **Permission Denied**: Clear error message with retry option
- **API Unavailable**: Service unavailability message with retry
- **Network Issues**: Graceful degradation with user feedback

## Architecture

### Components
- `SpeechToText` - Main container component with state management
- `RecordButton` - Animated button with breathing effect during recording
- `TranscriptionDisplay` - Text display area with fade-in animation and shimmer loading
- `StatusIndicator` - Recording status display

### Hooks
- `useRecorder` - Custom hook for MediaRecorder API integration

### Services
- `api.ts` - Backend API integration for transcription

### Styling
- CSS Modules for scoped component styles
- CSS Custom Properties for consistent theming
- Gradient backgrounds and smooth animations

## Browser Compatibility

- **Chrome** 60+ ✅
- **Firefox** 55+ ✅  
- **Safari** 14+ ✅
- **Edge** 79+ ✅

*Note: Requires browsers with MediaRecorder API support*

## Known Issues

1. **ESLint Plugin**: `@typescript-eslint/eslint-plugin` dependency resolution issue
   - **Workaround**: Use `npx tsc --noEmit` for type checking instead
   
2. **E2E Tests**: Some tests may timeout in CI environments
   - **Workaround**: Run tests individually or increase timeout values

3. **Microphone Permissions**: E2E tests cannot fully simulate microphone permissions in headless browsers
   - **Limitation**: Some E2E tests use mocked permission scenarios

## Development Tips

### Hot Reload
The Vite dev server supports hot module replacement. Changes to components will reload automatically.

### API Development
If developing the backend simultaneously, the Vite proxy forwards `/api/*` requests to `http://localhost:8000`.

### Testing Microphone
For local testing without a backend:
1. Use browser dev tools to mock the API response
2. The component handles permission requests automatically
3. Check browser console for MediaRecorder events

## Troubleshooting

### "Permission Denied" Error
1. Check browser microphone permissions in settings
2. Ensure HTTPS or localhost (required for microphone access)
3. Try different browser if issues persist

### "Service Unavailable" Error  
1. Verify backend API is running on port 8000
2. Check network connectivity
3. Ensure `/api/v1/transcribe` endpoint exists and accepts FormData

### Build Failures
1. Run `npx tsc --noEmit` to check TypeScript errors
2. Clear `node_modules` and reinstall if dependency issues
3. Ensure Node.js version is 18+

## Contributing

1. Follow the existing code style and patterns
2. Add tests for new features
3. Ensure TypeScript compilation passes
4. Test across multiple browsers

## Technical Specifications

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4.5
- **Testing**: Vitest + Playwright
- **Styling**: CSS Modules + CSS Custom Properties
- **Icons**: Lucide React
- **Audio**: Browser MediaRecorder API

---

For more detailed technical documentation, see the `artifacts/` directory which contains the original specifications and development retrospectives.