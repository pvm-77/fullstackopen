import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'


test('renders content', () => {
  const blog = {
    title: 'some title',
    author: 'sarfaraz',
    url: 'dfjkgdkjg'
  }

  const { container } = render(<Blog blog={blog} />)
  //   const element=screen.getByText('some title')
  //   expect(element).toBedefined()
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const div = container.querySelector('#blog')
  expect(div).toHaveTextContent('some title')
})