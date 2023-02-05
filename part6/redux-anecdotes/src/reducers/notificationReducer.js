
import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
let timeoutId = null
export const createNotification = (message, time) => {


    return async dispatch => {
        dispatch(setNotification(message))
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            dispatch(removeNotification(null))
        }, time * 1000)


    }

}
export default notificationSlice.reducer