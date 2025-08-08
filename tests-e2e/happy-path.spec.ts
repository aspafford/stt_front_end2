import { test, expect } from '@playwright/test';

test.describe('Happy Path - Successful Transcription Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete successful transcription flow', async ({ page }) => {
    // Mock the API response
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          transcription: 'This is a successful transcription of the recorded audio.'
        })
      });
    });

    // Initial state - verify idle state
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Click the button below to start recording');
    
    const recordButton = page.getByRole('button');
    await expect(recordButton).toContainText('Start Recording');
    await expect(recordButton).toBeEnabled();

    // Click to start recording
    await recordButton.click();
    
    // Verify recording state
    await expect(recordButton).toContainText('Stop Recording');
    
    // Check for recording status indicator
    const statusText = page.getByText('Recording...');
    await expect(statusText).toBeVisible();

    // Verify breathing animation is applied (check for the class)
    const iconWrapper = page.locator('[class*="breathingIcon"]');
    await expect(iconWrapper).toBeVisible();

    // Click to stop recording
    await recordButton.click();
    
    // Verify loading state
    await expect(recordButton).toContainText('Processing...');
    await expect(recordButton).toBeDisabled();
    
    // Verify shimmer effect is applied during loading
    const loadingContainer = page.locator('[class*="loading"]');
    await expect(loadingContainer).toBeVisible();

    // Wait for transcription to appear
    await expect(transcriptionDisplay).toContainText('This is a successful transcription of the recorded audio.');
    
    // Verify return to idle state
    await expect(recordButton).toContainText('Start Recording');
    await expect(recordButton).toBeEnabled();
    
    // Recording status should be hidden
    await expect(statusText).not.toBeVisible();
  });

  test('should display correct icons at each stage', async ({ page }) => {
    // Mock the API
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ transcription: 'Test transcription' })
      });
    });

    // Check initial mic icon
    const micIcon = page.locator('svg').first();
    await expect(micIcon).toBeVisible();
    
    // Start recording and check for stop icon
    await page.getByRole('button').click();
    const stopIcon = page.locator('svg').first();
    await expect(stopIcon).toBeVisible();
    
    // Stop recording and check for spinner during loading
    await page.getByRole('button').click();
    const spinner = page.locator('[class*="spinner"]');
    await expect(spinner).toBeVisible();
    
    // Wait for idle state and mic icon again
    await page.waitForTimeout(1500);
    await expect(micIcon).toBeVisible();
  });

  test('should apply text fade-in animation when transcription appears', async ({ page }) => {
    // Mock the API
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          transcription: 'Animated transcription text that fades in smoothly.' 
        })
      });
    });

    // Start and stop recording
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await recordButton.click();
    
    // Check for text animation class
    const transcriptionText = page.locator('[class*="transcriptionText"]');
    await expect(transcriptionText).toBeVisible();
    await expect(transcriptionText).toContainText('Animated transcription text');
  });
});