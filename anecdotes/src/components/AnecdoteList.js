import { useSelector, useDispatch } from 'react-redux'
import { upVoteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    // use selector allows us to access the state in the store
    // const anecdotes = useSelector(state => state.anecdotes)
    
    const anecdotes = useSelector(state => {
        const filter = state.filter
        return state.anecdotes.filter(a => a.content.includes(filter))
    })
    
    const upVote = (id) => { dispatch(upVoteAnecdote(id)) }

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