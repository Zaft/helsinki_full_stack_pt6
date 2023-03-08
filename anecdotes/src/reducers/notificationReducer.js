import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        removeMessage(state, action) {
            return null
        }
    }
})

export const setNotification = (message, duration) => {
    return async dispatch => {
        dispatch(setMessage(message))
        const timeout = (duration * 1000)
        setTimeout(() => { dispatch(removeMessage())}, timeout)
    }
}

export const { setMessage, removeMessage }  = notificationSlice.actions
export default notificationSlice.reducer 

