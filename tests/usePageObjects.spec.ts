import {test} from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'

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
