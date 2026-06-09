import {test as base} from '@playwright/test'
import {Page} from "@playwright/test"
import {NavigationPage} from './navigationPage'
import {FormLayoutsPage} from "./formLayoutsPage";
import {DatePickerPage} from "./datePickerPage";

export class PageManager{
  private readonly page: Page
  private readonly navigationPage: NavigationPage
  private readonly formLayoutsPage: FormLayoutsPage
  private readonly datepickerPage: DatePickerPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page)
    this.formLayoutsPage = new FormLayoutsPage(this.page)
    this.datepickerPage = new DatePickerPage(this.page)
  }

  get navigateTo(){
    return this.navigationPage
  }
  get onFormLayoutsPage(){
    return this.formLayoutsPage
  }
  get onDatepickerPage(){
    return this.datepickerPage
  }
}

type pageManager = {
  pm: PageManager
}

export const test = base.extend<pageManager>({
  pm: async ({page}, use) => {
    const pm = new PageManager(page)
    await use(pm)
  }
})

export {expect} from '@playwright/test'
