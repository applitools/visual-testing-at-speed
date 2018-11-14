'use strict'
const {describe, it, before, after} = require('mocha')
const webdriver = require('selenium-webdriver')
const {Eyes} = require('@applitools/eyes.selenium')
require('chromedriver')
const {By, Key} = webdriver

let TODO_ITEM_ONE = 'buy some cheese'
let TODO_ITEM_TWO = 'feed the cat'
let TODO_ITEM_THREE = 'book a doctors appointment'

describe('Applitools Hello App', function() {
  let driver
  before(() => (driver = new webdriver.Builder().forBrowser('chrome').build()))
  after(async () => await driver.quit())

  let eyes
  before(async () => {
    eyes = new Eyes()
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY)

    await eyes.open(driver, 'TodoMVC', 'visual-testing-at-speed selenium test')
  })
  after(async () => await eyes.close())

  describe('home page', () => {
    it('should be visually perfect (e2e)', async () => {
      await driver.get('http://localhost:3000/')

      await eyes.checkWindow('No todos')

      const newTodoElement = await driver.findElement(By.css('.new-todo'))
      await newTodoElement.sendKeys(TODO_ITEM_ONE + Key.RETURN)

      await eyes.checkWindow('One todo')

      await newTodoElement.sendKeys(TODO_ITEM_TWO + Key.RETURN)

      await eyes.checkWindow('Two todos')

      await newTodoElement.sendKeys(TODO_ITEM_THREE + Key.RETURN)

      await eyes.checkWindow('Three todo')

      const toggleAllElement = await driver.findElement(By.css('.toggle-all'))
      await toggleAllElement.click()

      await eyes.checkWindow('Todos marked as complete')
    })
  })
})
