import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'


test('renders blog content', () => {
  // create new blog
  const blog = {
    title: 'the sea voyage',
    author: 'John Deo',
  }
  // render the blog to test Suitable format
  render(<Blog blog={blog} />)
  // access rendered component
  const element = screen.getByText('the sea voyage')
  screen.debug(element)
  // results
  expect(element).toBeDefined()


})

test('renders blog content using CSS-class', () => {
  // create blog content
  const blog = {
    title: 'testing blog using CSS',
    author: 'some anony'
  }
  // render the Blog component to testing format
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('testing blog using CSS')


})