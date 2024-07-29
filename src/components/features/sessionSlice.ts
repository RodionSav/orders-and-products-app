import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionsState {
  activeSessions: number;
}

const initialState: SessionsState = {
  activeSessions: 0,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setActiveSessions(state, action: PayloadAction<number>) {
      state.activeSessions = action.payload;
    },
  },
});

export const { setActiveSessions } = sessionsSlice.actions;
export default sessionsSlice.reducer;
