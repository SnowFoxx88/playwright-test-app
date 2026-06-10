import {test} from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'
// @ts-ignore
import { argosScreenshot } from "@argos-ci/playwright"

test.beforeEach(async({page}) => {
  await page.goto("http://localhost:4200")
})

test('navigate to form page @smoke', async ({pm}) => {
  await pm.navigateTo.formLayoutsPage()
  await pm.navigateTo.datePickerPage()
  await pm.navigateTo.smartTablePage()
  await pm.navigateTo.toastrPage()
  await pm.navigateTo.tooltipPage()
})

test('parametrized methods @smoke' , async ({pm}) =>{
  await pm.navigateTo.formLayoutsPage()
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

  await pm.onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'pw123', 'Option 1')
  await pm.onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
  await pm.navigateTo.datePickerPage()
  await pm.onDatepickerPage.selectCommonDatePickerDateFromToday(2)
  await pm.onDatepickerPage.selectDatepickerWithRangeFromToday(2,4)

})

test.only('testing with argos ci', async ({page,pm}) => {
  await pm.navigateTo.formLayoutsPage()
  await argosScreenshot(page, "form layouts page")
  await pm.navigateTo.datePickerPage()
  await argosScreenshot(page, "datepicker page")
})
