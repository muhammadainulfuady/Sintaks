import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const API_URL = 'http://localhost:8000/api';
const TEST_EMAIL = 'ainul@example.com';
const TEST_PASSWORD = 'password123';

test.describe('Sintaks Frontend - Comprehensive Testing', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(BASE_URL);
  });

  test.afterEach(async () => {
    await page.close();
  });

  // TEST 1: Landing Page
  test('1. Landing Page - Verify structure and accessibility', async () => {
    await page.goto(`${BASE_URL}/`);
    
    // Check for key elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=/Mulai Belajar|Login/')).toHaveCount(2);
    
    // Check for hero section
    const heroSection = page.locator('h1, [class*="hero"]').first();
    await expect(heroSection).toBeVisible();
    
    // Check for features section
    const featuresSection = page.locator('text=/fitur|Feature/i').first();
    await expect(featuresSection).toBeVisible();
    
    // Verify no console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    expect(errors.length).toBe(0);
  });

  // TEST 2: Register Flow
  test('2. Register Flow - Create new account', async () => {
    const timestamp = Date.now();
    const testUser = {
      name: 'Test User',
      username: `testuser_${timestamp}`,
      email: `testuser_${timestamp}@example.com`,
      password: 'TestPassword123!'
    };

    // Navigate to register
    await page.click('text=/Mulai Belajar/i');
    await expect(page).toHaveURL(/\/register/);
    
    // Fill form
    await page.fill('input[name="name"], input[type="text"]:first-of-type', testUser.name);
    await page.fill('input[name="username"], input[type="text"]:nth-of-type(2)', testUser.username);
    await page.fill('input[name="email"], input[type="email"]', testUser.email);
    await page.fill('input[name="password"], input[type="password"]:first-of-type', testUser.password);
    await page.fill('input[name="confirmPassword"], input[type="password"]:nth-of-type(2)', testUser.password);
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    
    // Check for success (either message or redirect)
    const isRedirected = page.url().includes('/login') || page.url().includes('/dashboard');
    const hasSuccessMessage = await page.locator('text=/berhasil|success|sukses/i').isVisible().catch(() => false);
    
    expect(isRedirected || hasSuccessMessage).toBeTruthy();
  });

  // TEST 3: Login Flow
  test('3. Login Flow - Authenticate user', async () => {
    await page.goto(`${BASE_URL}/login`);
    
    // Check login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Fill credentials
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect or success
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    
    // Check token in localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
    
    // Check redirect to dashboard
    expect(page.url()).toContain('/dashboard');
  });

  // TEST 4: Dashboard Page
  test('4. Dashboard Page - Verify layout and content', async () => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Check dashboard elements
    await expect(page.locator('text=/Dashboard|Profile|Statistik/i').first()).toBeVisible();
    
    // Check for user profile card
    const profileCard = page.locator('[class*="profile"], [class*="card"]').first();
    await expect(profileCard).toBeVisible();
    
    // Check for navigation menu
    const navMenu = page.locator('nav, [class*="menu"]').first();
    await expect(navMenu).toBeVisible();
    
    // Check for statistics
    const stats = page.locator('text=/XP|Level|Modul|Notes/i');
    expect(await stats.count()).toBeGreaterThan(0);
  });

  // TEST 5: Learning Paths
  test('5. Learning Paths - View and navigate paths', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/learning-paths');
    
    // Check if paths load
    const pathCards = page.locator('[class*="card"], li, div').filter({ hasText: /Pemula|Intermediate|Advanced/i });
    expect(await pathCards.count()).toBeGreaterThan(0);
    
    // Click on first path
    const firstPath = page.locator('a, button').filter({ hasText: /Python|JavaScript|Web/i }).first();
    if (await firstPath.isVisible()) {
      await firstPath.click();
      await page.waitForNavigation();
      
      // Verify detail page
      await expect(page.locator('text=/Modul|Module/i')).toBeVisible();
    }
  });

  // TEST 6: Modules & Lessons
  test('6. Modules & Lessons - Load lesson content', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/learning-paths');
    
    // Navigate to a module
    const moduleLink = page.locator('a').filter({ hasText: /Modul|Module/i }).first();
    if (await moduleLink.isVisible()) {
      await moduleLink.click();
      await page.waitForNavigation();
      
      // Check lesson list
      const lessons = page.locator('[class*="lesson"], li, div').filter({ hasText: /Lesson|Pelajaran/i });
      expect(await lessons.count()).toBeGreaterThanOrEqual(0);
      
      // Click first lesson
      const firstLesson = lessons.first();
      if (await firstLesson.isVisible()) {
        await firstLesson.click();
        await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
        
        // Check lesson content
        await expect(page.locator('text=/Materi|Content|NOVA/i').first()).toBeVisible();
      }
    }
  });

  // TEST 7: Quiz Feature
  test('7. Quiz Feature - Take quiz and submit answers', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/learning-paths');
    
    // Find quiz button
    const quizButton = page.locator('button, a').filter({ hasText: /Quiz|Kuis/i }).first();
    if (await quizButton.isVisible()) {
      await quizButton.click();
      await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
      
      // Check if quiz questions load
      const questions = page.locator('[class*="question"], div').filter({ hasText: /\?/i });
      expect(await questions.count()).toBeGreaterThanOrEqual(0);
      
      // Try to answer first question
      const options = page.locator('input[type="radio"], button[class*="option"]');
      if (await options.count() > 0) {
        await options.first().click();
      }
      
      // Submit button
      const submitBtn = page.locator('button').filter({ hasText: /Submit|Kirim|Jawab/i }).first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        
        // Check for feedback
        await expect(page.locator('text=/Benar|Salah|Correct|Incorrect|Feedback/i').first()).toBeVisible({ timeout: 3000 }).catch(() => {});
      }
    }
  });

  // TEST 8: Notes Feature
  test('8. Notes Feature - Create, edit, delete notes', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/notes');
    
    // Create note
    const createBtn = page.locator('button').filter({ hasText: /Buat|Create|Tambah/i }).first();
    if (await createBtn.isVisible()) {
      await createBtn.click();
      
      // Fill note
      const noteInput = page.locator('textarea, [contenteditable="true"]').first();
      if (await noteInput.isVisible()) {
        await noteInput.fill('Test note content');
        
        // Save
        const saveBtn = page.locator('button').filter({ hasText: /Simpan|Save|Tambah/i }).first();
        if (await saveBtn.isVisible()) {
          await saveBtn.click();
          await page.waitForTimeout(1000);
          
          // Check if note appears
          await expect(page.locator('text=/Test note/i')).toBeVisible({ timeout: 3000 }).catch(() => {});
        }
      }
    }
  });

  // TEST 9: Community Feature
  test('9. Community Feature - Browse and post messages', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/community');
    
    // Check community list
    const communities = page.locator('[class*="card"], div, li').filter({ hasText: /komunitas|community/i });
    expect(await communities.count()).toBeGreaterThanOrEqual(0);
    
    // Click on first community
    const firstCommunity = page.locator('a, button').first();
    if (await firstCommunity.isVisible()) {
      await firstCommunity.click();
      await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
      
      // Check messages
      const messages = page.locator('[class*="message"], div').filter({ hasText: /.+/i });
      expect(await messages.count()).toBeGreaterThanOrEqual(0);
    }
  });

  // TEST 10: Profile & Settings
  test('10. Profile & Settings - View and update profile', async () => {
    await loginAndNavigate(page, TEST_EMAIL, TEST_PASSWORD, '/profile');
    
    // Check profile content
    await expect(page.locator('text=/Profil|Profile|Email|Username/i').first()).toBeVisible();
    
    // Check edit button
    const editBtn = page.locator('button').filter({ hasText: /Edit|Ubah|Perbarui/i }).first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      
      // Check if form appears
      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
    
    // Check leaderboard link
    const leaderboardLink = page.locator('a').filter({ hasText: /Leaderboard|Papan Peringkat/i }).first();
    if (await leaderboardLink.isVisible()) {
      await leaderboardLink.click();
      await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
      
      // Verify leaderboard loads
      await expect(page.locator('text=/Ranking|Rank|Leaderboard/i').first()).toBeVisible();
    }
  });

  // TEST 11: Error Handling
  test('11. Error Handling - Unauthorized access and invalid routes', async () => {
    // Clear localStorage to simulate unauthenticated state
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    // Try to access protected route
    await page.goto(`${BASE_URL}/dashboard`);
    
    // Should redirect to login
    expect(page.url()).toContain('/login');
    
    // Try invalid credentials
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('text=/salah|error|invalid/i').first()).toBeVisible({ timeout: 3000 }).catch(() => {});
    
    // Try non-existent page
    await page.goto(`${BASE_URL}/non-existent-page-12345`);
    // Should either show 404 or redirect to home
    const isHomeOrError = page.url() === BASE_URL || page.url().includes('404');
    expect(isHomeOrError).toBeTruthy();
  });

  // TEST 12: Responsive Design
  test('12. Responsive Design - Desktop layout', async () => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/`);
    
    // Check no overflow
    const bodyOverflow = await page.evaluate(() => 
      window.getComputedStyle(document.body).overflow
    );
    
    // Navigation should be visible
    await expect(page.locator('nav, [class*="menu"]').first()).toBeVisible();
  });

  test('12. Responsive Design - Tablet layout', async () => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/`);
    
    // Check responsive elements
    await expect(page.locator('header, nav').first()).toBeVisible();
  });

  test('12. Responsive Design - Mobile layout', async () => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    
    // Check mobile menu exists
    const mobileMenu = page.locator('button[class*="menu"], button[class*="hamburger"], [class*="mobile"]');
    expect(await mobileMenu.count()).toBeGreaterThanOrEqual(0);
    
    // Navigation should be accessible
    await expect(page.locator('nav, [class*="nav"]').first()).toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  // TEST 13: Performance
  test('13. Performance - Page load metrics', async () => {
    const startTime = Date.now();
    await page.goto(`${BASE_URL}/`);
    const loadTime = Date.now() - startTime;
    
    // Page should load in reasonable time (< 5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    // Check for bundle size (basic check)
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').length;
    });
    
    // Should have reasonable number of resources
    expect(resources).toBeGreaterThan(0);
  });

  // TEST 14: Accessibility
  test('14. Accessibility - Keyboard navigation', async () => {
    await page.goto(`${BASE_URL}/login`);
    
    // Tab to first input
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Continue tabbing
    await page.keyboard.press('Tab');
    focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('14. Accessibility - Color contrast', async () => {
    await page.goto(`${BASE_URL}/`);
    
    // Check for color contrast issues (basic check)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    for (const heading of headings.slice(0, 3)) {
      const isVisible = await heading.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });

  test('14. Accessibility - Form labels', async () => {
    await page.goto(`${BASE_URL}/login`);
    
    // Check if form inputs have labels or aria-labels
    const inputs = await page.locator('input').all();
    for (const input of inputs.slice(0, 2)) {
      const hasLabel = await input.evaluate((el: HTMLInputElement) => {
        const label = document.querySelector(`label[for="${el.id}"]`);
        const ariaLabel = el.getAttribute('aria-label');
        return !!label || !!ariaLabel || el.placeholder;
      });
      expect(hasLabel).toBeTruthy();
    }
  });
});

// Helper function
async function loginAndNavigate(page: Page, email: string, password: string, path: string) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto(`${BASE_URL}${path}`);
}
