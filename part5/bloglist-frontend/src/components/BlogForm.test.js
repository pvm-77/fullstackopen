import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'
import BlogForm from './BlogForm'
test('<BlogForm/> updates parent state and calls onSubmit', async () => {
  //mock event handler[which is recieved as prop from parent]
  const createBlog = jest.fn()
  // start a session to interact with rendered component[LoginForm]
  const user = userEvent.setup()
  // mock rendering of component to DOM
  const { container } = render(<BlogForm createBlog={createBlog} />)
  //   mock filling up BlogForm
  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  //   const sendButton = container.querySelector('#create-blog-btn')
  const sendButton = screen.getByText('create')
  //   moch typing in form
  await user.type(author,'John Deo')
  await user.type(title,'how to test blogform from client side')
  await user.type(url,'testingforntendwithjest.html')

  // mock click create button
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('how to test blogform from client side')
})