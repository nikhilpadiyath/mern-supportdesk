import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice'
import ticketReducer from '../features/tickets/TicketSlice'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      tickets: ticketReducer,
  },
});
