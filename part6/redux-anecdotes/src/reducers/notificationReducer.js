
import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            const notification = action.payload
            return notification
        },
        clearNotification(state, action) {
            return action.payload
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions
let timeoutId = null

export const setNotification = (message, time) => {


    return async dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(message))


        timeoutId = setTimeout(() => {
            dispatch(clearNotification(null))
        }, time * 1000)


    }
    // 
    }
    export default notificationSlice.reducer