
import { createSlice } from "@reduxjs/toolkit";


const initialState = []
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            console.log('payload is ', notification);
            state.push(notification);
        },
        removeNotification(state, action) {
            console.log('state in remove no--->', state);
            // remove the notification
            state = []
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer