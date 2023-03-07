import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
    // NOTE: testing the anecdote reducer is somewhat complicated because when it is
    // initialized each of the anecdote strings are turned into objects with a 
    // randomly assigned id attribute.
    const initialState = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
      ]

    test('should return proper initial state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }
        const newState = anecdoteReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })
})