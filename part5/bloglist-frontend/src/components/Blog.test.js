import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import './Blog'
// ex 5.13
test('renders author name and title of a blog', () => {
  // create new blog
  const blog = {
    title: 'the sea voyage',
    author: 'John Deo',
    user: {
      name: 'sampleName'
    }
  }
  // render the blog to test Suitable format
  const { container } = render(<Blog blog={blog} />)
  // access rendered component
  const blogDiv = container.querySelector('.blog')
  screen.debug(blogDiv)
  // results
  expect(blogDiv).toBeDefined()
  expect(blogDiv).toHaveTextContent('the sea voyage')
  expect(blogDiv).toHaveTextContent('John Deo')
  expect(blogDiv).not.toHaveTextContent('someurl.html')
})

test('blog url and likes shown on view button click', async () => {
  const blog = {
    title: 'the sea voyage',
    author: 'John Deo',
    url: 'some',
    likes: 5,
    user: {
      name: 'sampleName'
    }
  }
  const user = userEvent.setup()
  // render the blog to test Suitable format
  const { container } = render(<Blog blog={blog} />)
  // access rendered component
  const viewButton = container.querySelector('#btn')
  await user.click(viewButton)
  const div = container.querySelector('.expand-blog-detail')

  // results
  expect(div).not.toHaveStyle('display:none')
  expect(div).toHaveTextContent('some')
  expect(div).toHaveTextContent(5)



})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'the sea voyage',
    author: 'John Deo',
    url: 'some',
    likes: 5,
    user: {
      name: 'sampleName'
    }
  }
  const mockHandler=jest.fn()
  const user = userEvent.setup()
  // render the blog to test Suitable format
  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)
  // access rendered component
  const viewButton = container.querySelector('#btn')
  await user.click(viewButton)
  const likeButton =screen.getByText('like')
  likeButton.click()
  likeButton.click()
  expect(mockHandler.mock.calls).toHaveLength(2)

})