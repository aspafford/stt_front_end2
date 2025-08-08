import { test, expect } from '@playwright/test';

test.describe('API Errors - Backend Service Failures', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle 500 server error gracefully', async ({ page }) => {
    // Mock API to return 500 error
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    // Start recording
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await expect(recordButton).toContainText('Stop Recording');
    
    // Stop recording to trigger API call
    await recordButton.click();
    await expect(recordButton).toContainText('Processing...');
    
    // Wait for error state
    await expect(recordButton).toContainText('Try Again');
    
    // Check error message
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Transcription service is currently unavailable');
    
    // Check for error icon
    const alertIcon = page.locator('svg[role="img"][aria-label="Alert"]');
    await expect(alertIcon).toBeVisible();
  });

  test('should handle network timeout errors', async ({ page }) => {
    // Mock API to simulate timeout
    await page.route('**/api/v1/transcribe', async (route) => {
      // Delay response to simulate timeout
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.abort('timedout');
    });

    // Start and stop recording
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await recordButton.click();
    
    // Should show error state
    await expect(recordButton).toContainText('Try Again');
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Transcription service is currently unavailable');
  });

  test('should handle 404 not found error', async ({ page }) => {
    // Mock API to return 404
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Endpoint not found' })
      });
    });

    // Start and stop recording
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await recordButton.click();
    
    // Should show error state
    await expect(recordButton).toContainText('Try Again');
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Transcription service is currently unavailable');
  });

  test('should handle malformed API response', async ({ page }) => {
    // Mock API to return invalid JSON
    await page.route('**/api/v1/transcribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Invalid response format'
      });
    });

    // Start and stop recording
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await recordButton.click();
    
    // Should show error state
    await expect(recordButton).toContainText('Try Again');
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Transcription service is currently unavailable');
  });

  test('should allow retry after API error', async ({ page }) => {
    let callCount = 0;
    
    // Mock API to fail first, then succeed
    await page.route('**/api/v1/transcribe', async (route) => {
      callCount++;
      if (callCount === 1) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server Error' })
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ transcription: 'Success after retry!' })
        });
      }
    });

    // First attempt - should fail
    const recordButton = page.getByRole('button');
    await recordButton.click();
    await recordButton.click();
    
    await expect(recordButton).toContainText('Try Again');
    const transcriptionDisplay = page.locator('[class*="container"]').first();
    await expect(transcriptionDisplay).toContainText('Transcription service is currently unavailable');
    
    // Retry - should succeed
    await recordButton.click(); // Start recording again
    await expect(recordButton).toContainText('Stop Recording');
    await recordButton.click(); // Stop recording
    
    // Should show success
    await expect(transcriptionDisplay).toContainText('Success after retry!');
    await expect(recordButton).toContainText('Start Recording');
  });

  test('should handle rapid API calls without crashing', async ({ page }) => {
    // Mock API with alternating responses
    let callCount = 0;
    await page.route('**/api/v1/transcribe', async (route) => {
      callCount++;
      if (callCount % 2 === 0) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ transcription: `Transcription ${callCount}` })
        });
      } else {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Server Error' })
        });
      }
    });

    const recordButton = page.getByRole('button');
    
    // Rapid fire multiple recordings
    for (let i = 0; i < 3; i++) {
      await recordButton.click(); // Start
      await page.waitForTimeout(100);
      await recordButton.click(); // Stop
      await page.waitForTimeout(500);
    }
    
    // Component should still be functional
    await expect(recordButton).toBeVisible();
    await expect(recordButton).toBeEnabled();
  });
});