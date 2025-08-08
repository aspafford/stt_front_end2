## 1. Creative Direction: "Kinetic & Vibrant"

This creative direction moves beyond a standard, static interface to create an experience that feels alive, responsive, and modern. The "Kinetic & Vibrant" theme is defined by:

*   **Energy:** Use of gradients and subtle animations to give the component a sense of life.
*   **Clarity:** A clean, spacious layout with sharp typography ensures the user always understands the state of the application.
*   **Sophistication:** A refined color palette and consistent iconography elevate the component from a simple tool to a polished product.

This direction directly supports the "modern and fun" product directive by making the interaction itself a delightful experience.

## 2. Color Palette

The palette is designed for vibrancy and clarity, with a primary gradient for actions and distinct colors for system states.

*   **Primary Gradient (for buttons and accents):**
    *   `gradient-start`: `#8A2BE2` (Blue Violet)
    *   `gradient-end`: `#FF00FF` (Magenta)
*   **Neutral Palette:**
    *   `neutral-900` (Primary Text): `#1A1A1A`
    *   `neutral-700` (Secondary Text): `#555555`
    *   `neutral-400` (Borders/Dividers): `#DCDCDC`
    *   `neutral-200` (Area Background): `#F5F5F5`
    *   `neutral-100` (Component Background): `#FFFFFF`
*   **System State Colors:**
    *   `system-error` (Error State): `#D93025`
    *   `system-success` (Success State): `#1E8E3E`
    *   `system-recording` (Live Indicator): `#FF00FF` (Magenta, from the gradient)
*   **Text on Primary/System Colors:**
    *   `text-on-dark`: `#FFFFFF`

## 3. Typography

We will use "Inter" as the primary font, served via Google Fonts, to ensure a consistent and modern look across all platforms.

*   **Font Family:** `'Inter', system-ui, -apple-system, sans-serif`
*   **Typographic Scale:**
    *   **Transcription Text:**
        *   Font Size: `1.1rem` (17.6px)
        *   Font Weight: `400` (Regular)
        *   Line Height: `1.6`
        *   Color: `neutral-900`
    *   **Button Text:**
        *   Font Size: `1rem` (16px)
        *   Font Weight: `600` (Semi-Bold)
        *   Line Height: `1.5`
        *   Color: `text-on-dark`
    *   **Status Text (e.g., "Recording..."):**
        *   Font Size: `0.875rem` (14px)
        *   Font Weight: `500` (Medium)
        *   Line Height: `1.4`
        *   Color: `neutral-700`
    *   **Placeholder / Error Text:**
        *   Font Size: `1.1rem` (17.6px)
        *   Font Weight: `400` (Regular)
        *   Line Height: `1.6`
        *   Color: `neutral-700` (for placeholder), `system-error` (for error)

## 4. Spacing System

A consistent spacing system based on an `8px` base unit.

*   `space-1`: `4px`
*   `space-2`: `8px`
*   `space-3`: `16px`
*   `space-4`: `24px`
*   `space-5`: `32px`

*   **Layout Gaps:**
    *   Container Padding: `space-4` (24px)
    *   Text Area Padding: `space-3` (16px)
    *   Gap between Text Area and Button: `space-4` (24px)
    *   Gap between Button and Status Text: `space-3` (16px)
*   **Button Padding:** `12px 24px`

## 5. Iconography

We will use the **Lucide Icon** library for its clean, modern, and consistent style.

*   **Idle / Try Again Button:** `mic`
*   **Recording Button:** `stop-circle`
*   **Error State:** `alert-triangle` (to be displayed alongside the error text)

## 6. Component Styles

*   **Main Container:**
    *   `background-color`: `neutral-100`
    *   `border`: `1px solid neutral-400`
    *   `border-radius`: `12px`
    *   `box-shadow`: `0 8px 24px rgba(0, 0, 0, 0.08)`
*   **Transcription Display Area:**
    *   `background-color`: `neutral-200`
    *   `border`: `1px solid neutral-400`
    *   `border-radius`: `8px`
    *   `min-height`: `120px`
*   **Primary Button:**
    *   `background`: `linear-gradient(45deg, gradient-start, gradient-end)`
    *   `border`: `none`
    *   `border-radius`: `8px`
    *   `transition`: `transform 0.2s ease, box-shadow 0.2s ease`
    *   `box-shadow`: `0 4px 12px rgba(138, 43, 226, 0.3)`
    *   **Hover State:** `transform: translateY(-2px)`, `box-shadow: 0 6px 16px rgba(138, 43, 226, 0.4)`
    *   **Active State:** `transform: translateY(0px)`, `box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3)`

## 7. Delight: Micro-interactions & States

This section details the animations and visual feedback that bring the "Kinetic & Vibrant" direction to life.

*   **Idle State:**
    *   The placeholder text should read: "Click the button below to start recording. Your words will appear here."
*   **Recording State:**
    *   **Recording Indicator:** Instead of a blinking dot, the `stop-circle` icon on the button will have a subtle "breathing" animation. Its outer ring will pulse slowly using the `system-recording` color, growing and shrinking by `~2px` every 2 seconds.
    *   **Status Text:** The text "Recording..." will appear below the button, colored `neutral-700`.
    *   **Text Appearance:** As new words are transcribed, they should fade in smoothly over `300ms` rather than instantly appearing.
*   **Loading / Finalizing State:**
    *   **Use Case:** For a brief moment after the user clicks "Stop Recording" but before the final transcription is settled.
    *   **Feedback:** The text in the display area will have a subtle shimmer/skeleton animation moving across it to indicate processing. The button will be disabled.
*   **Error State:**
    *   The `alert-triangle` icon (color: `system-error`) will appear inside the transcription display area, above the error message text.
    *   The button text will be "Try Again" with the `mic` icon.

## 8. Visual North Star (Mockup Description)

A high-fidelity mockup generated from this spec would show a clean, white, rounded-corner component on a neutral background. The centerpiece is the vibrant purple-to-magenta gradient button with a clean, white "mic" icon and "Start Recording" text. Above it, a light-grey text area contains the inviting placeholder text. The entire component has a soft, modern shadow, making it feel like it's floating slightly above the page. When recording, the button's icon would be a `stop-circle`, its magenta ring pulsing gently, creating a visual heartbeat that reassures the user the app is listening.