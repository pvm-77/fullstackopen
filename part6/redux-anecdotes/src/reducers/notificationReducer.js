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
// create async action creator for notification
let timer
export const setNotification = (message, time) => {
    return async (dispatch) => {
        timer!==undefined?clearTimeout(timer):clearTimeout(undefined)
        dispatch(addNotification(message))
        timer = setTimeout(() => {
            dispatch(clearNotification(null))
        }, time * 1000)
    }



}
export default notificationSlice.reducer