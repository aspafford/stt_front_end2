# DESIGN SYSTEM

## 1. Design Principles
*   **Clarity:** The interface should be immediately understandable. Function over frills.
*   **Modern & Fun:** Use clean lines, modern typography, and a touch of color to create an engaging, not just functional, experience.
*   **Feedback-Driven:** The user must always be aware of the component's current state through clear visual cues.

## 2. Color Palette
*   **Background:** `#FFFFFF` (White)
*   **Primary Text:** `#212529` (Dark Gray)
*   **Secondary Text / Placeholders:** `#6c757d` (Medium Gray)
*   **Primary Action (Button):** `#007BFF` (Vibrant Blue)
*   **Primary Action (Text):** `#FFFFFF` (White)
*   **Recording Indicator:** `#DC3545` (Red)
*   **Borders / Dividers:** `#E9ECEF` (Light Gray)

## 3. Typography
*   **Font Family:** `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`. This ensures a modern, native feel across operating systems.
*   **Transcription Text:**
    *   Font Size: `1.1rem`
    *   Line Height: `1.6`
*   **Button Text:**
    *   Font Size: `1rem`
    *   Font Weight: `600`
*   **Status/Error Text:**
    *   Font Size: `0.9rem`

## 4. Spacing & Layout
*   **Base Unit:** `8px`
*   **Padding:**
    *   Container Padding: `24px` (`3 * base`)
    *   Button Padding: `12px 24px`
    *   Text Area Padding: `16px` (`2 * base`)
*   **Gaps:** Space between elements should be `16px` (`2 * base`).

## 5. Component Styles
*   **Main Container:**
    *   `border`: `1px solid #E9ECEF`
    *   `border-radius`: `8px`
    *   `box-shadow`: `0 4px 12px rgba(0, 0, 0, 0.05)`
*   **Button:**
    *   `border-radius`: `8px`
    *   `transition`: `background-color 0.2s ease-in-out`
    *   **Hover State:** Slightly lighter or darker shade of the primary color.
*   **Transcription Display:**
    *   `background-color`: `#F8F9FA` (Off-White)
    *   `border-radius`: `4px`
    *   `min-height`: `100px`