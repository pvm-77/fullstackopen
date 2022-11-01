describe('Blog app', function () {
  it('front page can be opened', function () {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000')
    // eslint-disable-next-line no-undef
    cy.contains('login')

  })

  it('login form can be opened', () => {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000')
    // eslint-disable-next-line no-undef
    cy.contains('login').click()
  })

  it('user can login', () => {

  })
  describe('when logged in', () => {
    it('a new blog can be created', () => {

    })
    describe('and a blog exists', () => {

    })



  })


})