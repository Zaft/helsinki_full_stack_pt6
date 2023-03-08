import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    // use selector allows us to access the state in the store    
    const anecdotes = useSelector(state => {
        const filter = state.filter
        return state.anecdotes.filter(a => a.content.includes(filter))
    })
    
    const upVote = (id) => { 
        const anecdote = anecdotes.find(a => a.id === id)
        const changed = {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        dispatch(updateAnecdote(changed))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => upVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList