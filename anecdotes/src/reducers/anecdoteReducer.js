import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      // const content = action.payload
      state.push(action.payload)
    },
    update(state, action) {
      const anecdote = action.payload
      // const old = state.find(a => a.id === anecdote.id)
      // const changed = {
      //   ...anecdote,
      // }
      console.log('reducer updateAnecdote', anecdote)
      return sortByVotes(state.map(a => 
        a.id !== anecdote.id ? a : anecdote
      ))
    },
    setAnecdotes(state, action) {
      // console.log('reducer payload',action.payload)
      return action.payload
    },
  }
})

const sortByVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote.id, anecdote)
    dispatch(update(updated))
  }
}

const updateObject = (oldObject, newValues) => {
  // encapsulate the idea copying data versus mutating data
  return Object.assign({}, oldObject, newValues)
}

const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) return item

    // use provided callback to create updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}

export const { appendAnecdote, setAnecdotes, update } = anecdoteSlice.actions
export default anecdoteSlice.reducer
// export { upVoteAnecdote, createAnecdote }