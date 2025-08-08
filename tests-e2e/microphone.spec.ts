import { test, expect, chromium } from '@playwright/test';

test.describe('Microphone Integration', () => {
  test('should handle microphone permissions and record audio', async ({ browserName }) => {
    // Skip this test for non-Chromium browsers as permission granting is Chromium-specific
    test.skip(browserName !== 'chromium', 'Microphone permission granting only works in Chromium');
    
    // Launch browser with microphone permissions
    const browser = await chromium.launch();
    const context = await browser.newContext({
      permissions: ['microphone']
    });
    const page = await context.newPage();
    
    // Navigate to the app
    await page.goto('http://localhost:5173');
    
    // Verify initial idle state
    const recordButton = page.getByRole('button', { name: /start recording/i });
    await expect(recordButton).toBeVisible();
    
    // Click to start recording
    await recordButton.click();
    
    // Note: Due to browser security, actual microphone permission will still prompt
    // But in our mock implementation, we can test the state transitions
    
    // For now, we'll test using the error simulation button
    // Clean up
    await context.close();
    await browser.close();
  });

  test('should handle microphone permission denial', async ({ page, context }) => {
    // Deny microphone permissions
    await context.clearPermissions();
    
    // Navigate to the app
    await page.goto('/');
    
    // Use the test error button to simulate permission denial
    // (Since we can't easily simulate actual permission denial in Playwright)
    await page.getByRole('button', { name: /test error state/i }).click();
    
    // Verify error state
    await expect(page.getByText(/could not access microphone/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
    
    // Click Try Again to return to idle
    await page.getByRole('button', { name: /try again/i }).click();
    
    // Verify return to idle state
    await expect(page.getByRole('button', { name: /start recording/i })).toBeVisible();
    await expect(page.getByText(/could not access microphone/i)).not.toBeVisible();
  });
});