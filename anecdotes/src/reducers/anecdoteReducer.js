import { createSlice } from '@reduxjs/toolkit'

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

const initialState = anecdotesAtStart.map(asObject)

//#region Action Creators
const upVoteAnecdote = (id) => {
  return {
    type: 'UPVOTE',
    payload: {
      id: id
    }
  }
}

const createAnecdote = (anecdote) => {
  // console.log('Action Creator, createAnecdote anecdote, ', anecdote)
  return {
    type: 'CREATE',
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}
//#endregion

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content: content,
        id: getId(),
        votes: 0
      })
    },
    upVoteAnecdote(state, action) {
      
    }
  }
})

// Notes: I followed the pattern for immutibaly updating the object and array
// using patterns in the redux documentation.
// https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'UPVOTE':
      // console.log('Reducer, UPVOTE (state, action)', state, action)
      const updatedState = upVote(state, action)
      return updatedState
    case 'CREATE':
      // console.log('Reducer, ADD (state, action)', state, action)
      const updateState = create(state, action)
      return updateState
    default: return state
  }
}

const create = (state, action) => {
  return sortByVotes(state.concat(action.payload))
}

const upVote = (state, action) => {
  const newState = updateItemInArray(state, action.payload.id, anecdote => {
    const votes = anecdote.votes + 1
    return updateObject(anecdote, { votes: votes })
  })

  return sortByVotes(newState)
}

const sortByVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
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

export default anecdoteReducer
export { upVoteAnecdote, createAnecdote }