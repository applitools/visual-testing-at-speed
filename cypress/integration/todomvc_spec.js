// small parts of this code copied from https://github.com/cypress-io/cypress-example-todomvc

describe('TodoMVC - React', function () {

  let TODO_ITEM_ONE = 'buy some cheese'
  let TODO_ITEM_TWO = 'feed the cat'
  let TODO_ITEM_THREE = 'book a doctors appointment'

  before(function () {
    cy.visit('http://localhost:3000/')
    cy.eyesOpen({batchName: 'visual-testing-at-speed cypress test', testName: 'TodoMVC', appName: 'TodoMVC',
      browser: [
        {width: 1024, height: 768, name: 'chrome'},
        // {width: 400, height: 500, name: 'chrome'},
        // {width: 1280, height: 1024, name: 'chrome'},
        // {deviceName: 'iPhone X'},
        // {deviceName: 'iPad Pro'},
        // {width: 400, height: 500, name: 'firefox'},
        // {width: 1024, height: 768, name: 'firefox'},
        // {width: 1280, height: 1024, name: 'firefox'},
      ]
    })
  })

  after(function () {
    cy.eyesClose()
  })

  it('should show no todos correctly', () => {
    cy.eyesCheckWindow('No todos')
  })

  it('should show a couple of todos correctly', () => {
    cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')

    cy.eyesCheckWindow({tag: 'Todo list with one', sizeMode: 'selector', selector: '.todo-list'})
    cy.eyesCheckWindow({tag: 'One todo'})

    cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')

    cy.eyesCheckWindow({tag: 'Two todos', sizeMode: 'full-page'})

    cy.get('.new-todo').type(TODO_ITEM_THREE).type('{enter}')

    cy.eyesCheckWindow('Three todos')
  })

  it('should show completed correctly', () => {
    cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')

    cy.get('.toggle-all').check()

    cy.eyesCheckWindow('todo marked as complete')
  })
})
