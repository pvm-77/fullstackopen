/* eslint-disable no-undef */

// Cypress.Commands.add('login', ({ username, password }) => {
//   cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
//     username, password
//   }).then(({ body }) => {

//     localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
//     console.log(localStorage)
//     cy.visit('')
//   })
// })



Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
// Cypress.Commands.add('createBlog', ({ title, author, url,likes=0 }) => {
//   cy.request({
//     url: `${Cypress.env('BACKEND')}/blogs`,
//     method: 'POST',
//     body: { title, author, url,likes },
//     header: {
//       'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
//     }
//   })
//   cy.visit('')
// })

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})