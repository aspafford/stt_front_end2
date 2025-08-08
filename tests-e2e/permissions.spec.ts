import { test, expect } from '@playwright/test';

test.describe('Permissions - Microphone Access Denial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error message when microphone permission is denied', async ({ page }) => {
    // Mock getUserMedia to simulate permission denial
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async () => {
        throw new Error('Permission denied');
      };
    });

    // Try to start recording
    const recordButton = page.getByRole('button').first();
    await recordButton.click();
    
    // Verify error state
    await expect(recordButton).toContainText('Try Again');
    
    // Check for error message in transcription display
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Could not access microphone');
    
    // Check for error icon
    const alertIcon = page.locator('svg[role="img"][aria-label="Alert"]');
    await expect(alertIcon).toBeVisible();
    
    // Verify error styling is applied
    const errorDiv = page.locator('[class*="error"]');
    await expect(errorDiv).toBeVisible();
  });

  test('should allow retry after permission denial', async ({ page }) => {
    // First mock getUserMedia to fail
    await page.addInitScript(() => {
      let callCount = 0;
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async () => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Permission denied');
        }
        // Return a mock stream on retry
        return {
          getTracks: () => [{ stop: () => {} }]
        };
      };
    });

    // Mock successful API after retry
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ transcription: 'Success after retry' })
      });
    });

    // First attempt will fail
    const recordButton = page.getByRole('button').first();
    await recordButton.click();
    
    // Verify error state
    await expect(recordButton).toContainText('Try Again');
    
    // Click Try Again button
    await recordButton.click();
    
    // Should return to recording state
    await expect(recordButton).toContainText('Stop Recording');
    
    // Complete the flow
    await recordButton.click();
    
    // Should process and show transcription
    await page.waitForTimeout(1500);
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Success after retry');
  });

  test('should maintain error message until user takes action', async ({ page }) => {
    // Mock getUserMedia to simulate permission denial
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async () => {
        throw new Error('Permission denied');
      };
    });

    // Try to start recording
    const recordButton = page.getByRole('button').first();
    await recordButton.click();
    
    // Error message should persist
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Could not access microphone');
    
    // Wait to ensure message doesn't disappear
    await page.waitForTimeout(2000);
    await expect(transcriptionDisplay).toContainText('Could not access microphone');
    
    // Error should clear when clicking Try Again
    await recordButton.click();
    
    // Should be in recording state now
    await expect(recordButton).toContainText('Stop Recording');
    await expect(transcriptionDisplay).not.toContainText('Could not access microphone');
  });

  test('should display correct UI elements in error state', async ({ page }) => {
    // Mock getUserMedia to simulate permission denial
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async () => {
        throw new Error('Permission denied');
      };
    });

    // Try to start recording
    const recordButton = page.getByRole('button').first();
    await recordButton.click();
    
    // Check all error state elements
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    const alertIcon = page.locator('svg[role="img"][aria-label="Alert"]');
    const micIcon = page.locator('svg').first();
    
    // Verify complete error state UI
    await expect(recordButton).toContainText('Try Again');
    await expect(transcriptionDisplay).toContainText('Could not access microphone');
    await expect(alertIcon).toBeVisible();
    await expect(micIcon).toBeVisible(); // Should show mic icon in Try Again button
    
    // Recording status should not be visible
    const statusText = page.getByText('Recording...');
    await expect(statusText).not.toBeVisible();
  });
});