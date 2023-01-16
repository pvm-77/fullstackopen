import { useState } from 'react'
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  // const navigate=useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} created successfully`)
    setTimeout(() => {
      setNotification('')
    }, 5000)




  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <Router>
        <div>

          <Menu />
          <div>{notification}</div>
        </div>
        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/createNew' element={<CreateNew addNew={addNew} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
