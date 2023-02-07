/* eslint-disable no-undef */

describe('Blog app', function () {
  // beforeEach(function () {
  //   // make a request to clean database using cypress
  //   cy.request('POST', 'http://localhost:3001/api/testing/reset')
  //   const user = {
  //     name: 'John Deo',
  //     username: 'johndeo297',
  //     password: 'somepassword'

  //   }
  //   // make  request to create user using cypress
  //   cy.request('POST', 'http://localhost:3001/api/users', user)
  //   cy.visit('http://localhost:3000')
  // })
  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')

      cy.contains('login').click()
      // get field by id and type
      cy.get('#username').type('mohib297')
      cy.get('#password').type('somepassword')
      cy.get('#loginBtn').click()
      cy.contains('mohib297 logged in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()
      cy.contains('username or password invalid')
    })
  })


  describe('when logged in', () => {
    // login here
    beforeEach(function () {
      cy.contains('login').click()
      // get field by id and type
      cy.get('#username').type('johndeo297')
      cy.get('#password').type('somepassword')
      cy.get('#loginBtn').click()
    })
    it('a new blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#title').type('how to sample test with cypress')
      cy.get('#author').type('Bruno Happy')
      cy.get('#url').type('howtocypress.html')
      cy.get('#create-blog-btn').click()
      cy.contains('how to sample test with cypress')

    })
    it('user can like a blog', function () {
      cy.contains('create new').click()
      cy.get('#title').type('how to sample test with cypress')
      cy.get('#author').type('Bruno Happy')
      cy.get('#url').type('howtocypress.html')

      cy.get('#create-blog-btn').click()
      cy.contains('view').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')


    })
  })




})