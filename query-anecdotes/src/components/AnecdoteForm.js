import { useMutation, useQueryClient} from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (res) => {
      console.log('af: success', res)
      queryClient.invalidateQueries('anecdotes')
      dispatch({
        type: 'SET',
        payload: 'anecdote successfully created'
      })
      setTimeout(() => {dispatch({type: 'REMOVE'})}, 5000)
    },
    onError: (error) => {
      console.log('af: error', error)
      dispatch({
        type: 'SET',
        payload: `${'too short anecdote, must have length 5 or more'}`
      })
      setTimeout(() => {dispatch({type: 'REMOVE'})}, 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0, id: getId()})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
