const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('/api/testing/reset')
    // create a user for the backend here
    // ...
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'bat',
        password: 'bat'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })
  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('bat')
      await page.getByTestId('password').fill('bat')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('user successfully logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
      await page.getByTestId('username').fill('bat')
      await page.getByTestId('password').fill('xxx')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('wrong')).toBeVisible()
    })
  })

})