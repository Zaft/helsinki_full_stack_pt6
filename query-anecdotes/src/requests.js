import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    axios.get(baseUrl).then(res => {
        console.log('getAnecdotes', res.data)
        return res.data
    })
}

export const createAnecdote = async (anecdote) => {
    let result = await axios.post(`${baseUrl}`, anecdote)
    return result
}

export const updateAnecdote = (anecdote) => {
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}