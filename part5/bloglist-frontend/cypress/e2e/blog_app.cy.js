/* eslint-disable no-undef */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Deo',
      username: 'johndeo297',
      password: 'somepassword'

    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.visit('')
    cy.contains('Log in to application')
  })




  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('johndeo297')
      cy.get('#password').type('somepassword')
      cy.get('#loginBtn').click()
      cy.contains('johndeo297 logged in')

    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()
      cy.contains('username or password invalid')

    })
  })



  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'johndeo297', password: 'somepassword' })
    })
    it('a blog can be created', function () {
      cy.createBlog(
        {
          title: 'test blog using cypress',
          author: 'John Deo',
          url: 'john.deo.test.com'
        }
      )
    })

    it('user can like a blog', function () {

      // cy.get('#button__text').click()
      // cy.get('#title').type('how to sample test with cypress')
      // cy.get('#author').type('Bruno Happy')
      // cy.get('#url').type('howtocypress.html')
      // cy.get('#create-blog-btn').click()
      // cy.contains('view').click()
      // cy.contains('0')
      // cy.contains('like').click()
      // cy.contains('1')
    })

    it('user can delete a blog', function () {
      // cy.get('#button__text').click()
      // cy.get('#title').type('how to sample test with cypress')
      // cy.get('#author').type('Bruno Happy')
      // cy.get('#url').type('howtocypress.html')
      // cy.get('#create-blog-btn').click()
      // cy.contains('view').click()
      // cy.contains('0')
      // cy.contains('like').click()
      // cy.contains('1')
      // cy.get('#delete-blog-btn').click()
      // cy.wait(5000)
      // cy.get('html').should('not.contain', 'how to sample test with cypress')


    })
    it('other users but the creator do not see the delete button', () => {


    })

    it('blogs are ordered according to likes with the blog with the most likes being first. ', () => {

    })



  }



  )




})