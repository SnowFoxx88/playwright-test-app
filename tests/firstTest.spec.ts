import {expect, test} from "@playwright/test"

test.beforeEach(async({page}) => {
  await page.goto("/")
  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
})

test("locator syntax rules", async({page}) =>{
  //by tage name
  page.locator("input")

  //by ID
  page.locator("#inputEmail")

  //by class value
  page.locator(".shape-rectangle")

  //by attribute
  page.locator("[placeholder='Email']")

  //by class value (full)
  page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']")

  //combine different selector
  page.locator("input[placeholder='Email'][nbinput]")

  // by xpath (not recommended)
  page.locator('//*[@id="inputEmail"]')

  //by partial text match
  page.locator(':text("Using")')

  //by exact tet match
  page.locator(':text-is("using the grid")')

})

//everything the user sees on the interface
test("user facing locators", async({page}) => {
  await page.getByRole("textbox", {name: "Email"}).first().click()
  // await page.getByRole("button", {name: "Sign in"}).first().click()

  await page.getByLabel("EMail").first().click()

  await page.getByPlaceholder("Jane Doe").first().click()

  await page.getByText("Using the Grid").click()

  await page.getByTestId("SignIn").click()

  await page.getByTitle("IoT Dashboard").click()

})

test("locating child elements", async({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test("locating parent elements", async({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole("textbox", {name: "Email"}).first().click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole("textbox", {name: "Email"}).first().click()

  await page.locator('nb-card').filter({hasText: 'Basic Form'}).getByRole("textbox", {name: "Email"}).first().click()
  //funkt nicht, weil es in das child zoomt: await page.locator('nb-card').getByText('Basic Form').getByRole("textbox", {name: "Email"}).first().click()

  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole("textbox", {name: "Password"}).first().click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole("textbox", {name: "Email"}).first().click()
  // xpath
  await page.locator(':text-is("Using the Grid")').locator(('..')).getByRole("textbox", {name: "Email"}).first().click()
})

test('reuse locators', async({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
  const emailField = basicForm.getByRole("textbox", {name: "Email"})

  await emailField.fill('test@test.com')
  await basicForm.getByRole("textbox", {name: "Password"}).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole("button").click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
  // single test value
  const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all test values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  // input value
  const emailField = basicForm.getByRole("textbox", {name: "Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic Form'}).locator('button')

  // general assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  // locator assertions
  await expect(basicFormButton).toHaveText('Submit')

  // soft assertion
  await expect.soft(basicFormButton).toHaveText('Submit5')
  await basicFormButton.click()
})
